import React, {useState} from 'react';
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";

export const Upload = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
  };
  return (
    <>
      <Dropzone accept='.json' maxFiles={1} maxHeight='1rem' localization="ES-es" onChange={updateFiles} value={files}>
        {files.map((file) => (
          <FileItem {...file} preview />
        ))}
      </Dropzone>
    </>
  )
}
