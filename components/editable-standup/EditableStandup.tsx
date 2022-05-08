import { useState } from 'react'

import EditableStandupItems from '../editable-standup-items/EditableStandupItems'
import ItemForm from './item-form/ItemForm'
import FormInput from '../form-input/FormInput'

import styles from './EditableStandup.module.scss'
import ActionWrapper from '../action-wrapper/ActionWrapper'
import { ItemStatus } from '../../types'
import useStandupsApi from '../../hooks/useStandupsApi'

export default function EditableStandup({ _id, name, items }) {
  const [standupsName, setStandupsName] = useState(name)
  const [state, setState] = useState('done')
  const { mutate } = useStandupsApi()

  const isStandupDone =
    items.length && items.every((item) => item.status === ItemStatus.Done)

  const handleStandupDelete = async () => {
    setState('pending')
    await fetch(`http://localhost:3000/api/standups/${_id}`, {
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

        <EditableStandupItems
          standupId={_id}
          items={items.map((item) => ({ ...item, standupId: _id }))}
        />
      </div>
    </div>
  )
}
