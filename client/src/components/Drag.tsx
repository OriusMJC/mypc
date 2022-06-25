import {Button, Spin, Upload} from 'antd'


function Drag() {


  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
    >
        <Upload.Dragger
        multiple
        listType='picture'
        action={'http://localhost:3000/'}      
        showUploadList={{showRemoveIcon: true}}  
        accept=".png,.jpg,.doc"
        beforeUpload={(file) =>{
            console.log(file);
            return false;
        }}
        defaultFileList={[

            {
                uid: "abc",
                name: "exising_file.png",
                status: "uploading",
                percent: 50,
                url: 'https://www.google.com',
            },
        ]}
        iconRender={() =>{
            return <Spin></Spin>
        }}
        progress={{
            strokeWidth: 3,
            strokeColor:{
                "0%" : "#f0f",
                "100%": "#ff0"
            },
            style: {top: 12},
        }}
        >
            Drags Files here
            <br />
            <Button>Click Upload</Button>
        </Upload.Dragger>
    </div>
  );
}

export default Drag;