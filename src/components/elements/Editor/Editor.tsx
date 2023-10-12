import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Editor = ({
  data = '',
  onChange,
  onBlur,
}: {
  data?: string
  onChange: (data: any) => void
  onBlur: (data: any) => void
}) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
      onBlur={onBlur}
      data={data}
    />
  )
}

export { Editor }
