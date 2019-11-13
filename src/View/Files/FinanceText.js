import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message,Spin} from 'antd';


const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";


export class FinanceText extends Component {
    state={
        modal_show:false,
        modal_show_file:false,
        modal_show_prop:false,
        modal_show_photo:false,
        update_id:'',
        update_type:'',
        update_value:'',
        file_list:[],
        file:"",
        title_of_file:"",
        info:'',
        new_text:'',
        new_title:'',
        new_link:'',
        loading:false,
        property_list:[],
        filePhoto:"",

    }
    refresh=()=>{
        Axios.get(url+'finance_text').then(res=>{this.setState({info:res.data});console.log(this.state.info);
        });
        Axios.get(url+'files_finance').then(res=>{this.setState({file_list:res.data});});
        Axios.get(url+'finance_properties').then(res=>{this.setState({property_list:res.data});});

        console.log(this.state.info);
    }
    componentWillMount(){
        this.refresh();
    }
    onClose=()=>{
        this.setState({modal_show:false});
    }
    onCloseProp=()=>{
        this.setState({modal_show_prop:false});
    }
    showDrawer=()=>{
        const {info}=this.state;
        this.setState({modal_show:true,new_text:info[0].text})
    }
    onCloseFile=()=>{
        this.setState({modal_show_file:false});
    }

    onClosePhoto=()=>{
        this.setState({modal_show_photo:false});
    }
    showDrawerPhoto=()=>{
        this.setState({modal_show_photo:true});
    }
    showDrawerFile=()=>{
        const {info}=this.state;
        this.setState({modal_show_file:true})
    }
    handleSubmit=()=>{
        Axios.post(url+"finance_text",{text:this.state.new_text}).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно обновлено');
            this.setState({modal_show:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }
    handleSubmitProp=()=>{
        var {update_id,update_type,update_value}=this.state;
        this.setState({loading:true})
        Axios.post(url+"finance_properties/"+update_id,{update_value:update_value}).then(res=>{
            console.log(res);
            this.refresh();
            this.setState({loading:false})
            message.success('Успешно добавлено');
            this.setState({modal_show_prop:false});
        }).catch(err=>{        this.setState({loading:false});
        console.log(err);message.error('Произошла ошибка!')});
    }
    handleSubmitFile=()=>{
        var {title_of_file,file}=this.state;
        this.setState({loading:true})
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        data.append('title_of_file',title_of_file);
        Axios.post(url+"files_finance",data).then(res=>{
            console.log(res);
            this.refresh();
            this.setState({loading:false})
            message.success('Успешно добавлено');
            this.setState({modal_show:false});
        }).catch(err=>{        this.setState({loading:false});
        console.log(err);message.error('Произошла ошибка!')});
    }
    handleSubmitPhoto=()=>{
        var {filePhoto}=this.state;
        this.setState({loading:true})
        console.log(filePhoto[0]);
        var data=new FormData();
        data.append('file',filePhoto[0]);
        Axios.post(url+"finance_background",data).then(res=>{
            console.log(res);
            this.refresh();
            this.setState({loading:false})
            message.success('Успешно добавлено');
            this.setState({modal_show_photo:false});
        }).catch(err=>{        this.setState({loading:false});
        console.log(err);message.error('Произошла ошибка!')});
    }
    render() {
        var arr=[{file_id:1,path:''}]
        const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Текст",
                dataIndex:"text",
                key:"text"
            },
        ]

        const columns3=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Тип",
                dataIndex:"type",
                key:"type"
            },
            {
                title:"Значение",
                dataIndex:"value",
                key:"value"
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                        <a onClick={()=>{
                            if (record.id==1) {
                                this.setState({modal_show_photo:true})
                            }
                            else{
                                this.setState({modal_show_prop:true,update_id:record.id,update_type:record.type,update_value:record.value})
                            }
                            }}>Изменить</a>
                  </span>
                ),
              }
        ]

        const columns2=[
            {
                title:"Id",
                dataIndex:"file_id",
                key:"file_id"
            },
            {
                title:"Название",
                dataIndex:"filename",
                key:"filename",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open(url+record.filename)}}>{text}</a> 
                    </span>
                  ),
            },{
                title:"Надпись на кнопке загрузки",
                dataIndex:"title_of_file",
                key:"title_of_file"
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={()=>{Axios.post(url+"files_finance/delete"+record.file_id,{info:record}).then(res=>{this.refresh()})}}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <a>Удалить</a>
                    </Popconfirm>
                  </span>
                ),
              }
        ]
        return (
            <>
            <div style={{maxWidth:"70%",width:"70%",marginLeft:"320px",marginTop:"40px"}}>
            <Spin spinning={this.state.loading}>
                <h1 style={{textAlign:'center'}}>Финансирование</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                </Button.Group>
                <Table bordered columns={columns3} dataSource={this.state.property_list} pagination={false}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onCloseProp}
                    visible={this.state.modal_show_prop}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Название">
                                <Input placeholder="" value={this.state.update_type} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Адрес">
                                <Input placeholder="" value={this.state.update_value} onChange={(e)=>{this.setState({update_value:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClosePrope} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmitProp} type="primary">
                        Добавить
                        </Button>
                    </div>
                </Drawer>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onClosePhoto}
                    visible={this.state.modal_show_photo}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Фотография">
                                <input type="file" onChange={(e)=>{this.setState({filePhoto:e.target.files})}}/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClosePhoto} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmitPhoto} type="primary">
                        Добавить
                        </Button>
                    </div>
                </Drawer>
                </Spin>

            </div>
            <div style={{maxWidth:"70%",width:"70%",marginLeft:"320px",marginTop:"40px"}}>
            <Spin spinning={this.state.loading}>

                <h1 style={{textAlign:'center'}}>Файлы</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawerFile} type="primary" >Добавить</Button>
                </Button.Group>
                <Table bordered columns={columns2} dataSource={this.state.file_list}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onCloseFile}
                    visible={this.state.modal_show_file}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Надпись на кнопке файла при отображении">
                                <Input placeholder="Введите текст" onChange={(e)=>{this.setState({title_of_file:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Файл">
                                <input type="file" accept="application/pdf" onChange={(e)=>{this.setState({file:e.target.files})}}/>
                            </Form.Item>
                        </Col>
                        </Row>
                       
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmitFile} type="primary">
                        Добавить
                        </Button>
                    </div>
                </Drawer>
                </Spin>
            </div>
            <div style={{maxWidth:"70%",width:"70%",marginLeft:"320px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Текст</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Поменять текст</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.info}/>
                <Drawer
                    title="Поменять данные"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.modal_show}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Текст">
                                <Input.TextArea autosize={{minRows:10}} placeholder="Введите текст" value={this.state.new_text} onChange={(e)=>{this.setState({new_text:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                        Поменять
                        </Button>
                    </div>
                </Drawer>
            </div>
            </>
        )
    }
}

export default FinanceText;
