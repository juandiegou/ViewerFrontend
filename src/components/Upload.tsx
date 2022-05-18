import React, {useEffect, useState} from 'react';
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";
import { Button } from 'react-bootstrap';
import * as GraphServer from "./GraphServer";
import { addNotification } from "../actions/others";

export const Upload = () => {
  //let estado = false;
  const [files, setFiles] = useState<FileValidated[]>([]);
  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
   
    
  };

  const JsonA = async ()  =>  {
    
    await GraphServer.registerGraph(files[0].file);
    window.location.reload();
    addNotification("sucess","success", "Graph uploaded successfully");
    
    
};

 
  return (
  
      <><Dropzone accept='.json' maxFiles={1} maxHeight='1rem' localization="ES-es" onChange={updateFiles} value={files}>
        {files.map((file) => (
        <FileItem {...file} preview />
      ))}

    </Dropzone><br/><Button variant="primary" onClick={() => JsonA() }>Save</Button>   </>
      
    

  
  )
  
}
