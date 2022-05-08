import { useState } from 'react'

import StandupItems from '../../standup-items'
import ActionWrapper from '../../action-wrapper'
import ItemForm from '../../forms/standup-item'
import FormInput from '../../forms/input'

import useStandupsApi from '../../../hooks/useStandupsApi'
import { ItemStatus } from '../../../types'

import styles from './Standup.module.scss'

export default function EditableStandup({ _id, name, items }) {
  const [standupsName, setStandupsName] = useState(name)
  const [state, setState] = useState('done')
  const { mutate } = useStandupsApi()

  const isStandupDone =
    items.length && items.every((item) => item.status === ItemStatus.Done)

  const handleStandupDelete = async () => {
    setState('pending')
    await fetch(`${window.location.origin}/api/standups/${_id}`, {
      method: 'DELETE',
    })
    setState('done')
    await mutate()
  }

  const className = `${styles.eStandup} ${
    isStandupDone ? styles.eStandupCompleted : ''
  }`.trim()

  return (
    <div className={className}>
      <ActionWrapper
        isComplete={isStandupDone}
        state={state}
        handleDelete={handleStandupDelete}
        actions={['delete']}
        isHeader
      >
        <FormInput
          value={standupsName}
          handleChange={(event) => setStandupsName(event.target.value)}
          invert
        />
      </ActionWrapper>

      <div className={styles.eStandupContent}>
        <ItemForm standupId={_id} invertInputStyle={true} />

        {/* {!!items.length && <Separator />} */}

        <StandupItems
          standupId={_id}
          items={items.map((item) => ({ ...item, standupId: _id }))}
        />
      </div>
    </div>
  )
}
