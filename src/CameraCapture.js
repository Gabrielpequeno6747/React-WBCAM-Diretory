import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';

const CameraCapture = () => {
  const [photo, setPhoto] = useState(null); 
  const webcamRef = useRef(null); 
  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); 
    setPhoto(imageSrc);
  };

  
  const downloadPhoto = () => {
    if (photo) {
      const blob = dataURLtoBlob(photo); 
      saveAs(blob, 'foto_capturada.jpg'); 
    }
  };

 
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className='Title'>Captura de Imagem da Webcam</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: 'user', 
        }}
      />
      <br />
      <button onClick={capture} className='ButonCapitura'>Capturar Foto</button>

      {photo && (
        <div>
          <h3>Foto Capturada:</h3>
          <img src={photo} alt="capturada" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {photo && (
        <div>
          <button onClick={downloadPhoto}>Baixar Foto</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
