import React, {useEffect, useState} from 'react';
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";
import * as GraphServer from "./GraphServer";
import { parseJsonSourceFileConfigFileContent } from 'typescript';
import { Button } from 'react-bootstrap';

export const Upload = () => {
  //let estado = false;
  const [files, setFiles] = useState<FileValidated[]>([]);
  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
   
    
  };

  const JsonA = ()  => {
    console.log(files[0].file);
    GraphServer.registerGraph(files[0].file);
};

 
  return (
  
      <><Dropzone accept='.json' maxFiles={1} maxHeight='1rem' localization="ES-es" onChange={updateFiles} value={files}>
        {files.map((file) => (
        <FileItem {...file} preview />
      ))}

    </Dropzone><br/><Button variant="primary" onClick={() => JsonA()}>Save</Button>   </>
      
    

  
  )
  
}
