import React, { Component } from 'react';
import { Menu, Icon, Button} from 'antd';
import {Switch,Route,Link,Redirect} from 'react-router-dom';
import SpecialOffersMain from '../Special_Offers/SpecialOffersMain';
import Slider from '../Slider/Slider';
import TestDrive from '../TestDrive/TestDrive';
import Vin from '../Vin/Vin';
import Questions from '../Questions/Questions';
import SubaruXVfile from '../Files/SubaruXVfile';
import Legacyfile from '../Files/Legacyfile';
import Foresterfile from '../Files/Foresterfile';
import Outbackfile from '../Files/Outbackfile';
import LoginFinal from '../Login/Login';
import FileAll from '../Files/File';
import Youtube from '../Files/Youtube';
import FileFinance from '../Files/FileFinance';
import ModelBackground from '../Files/ModelBackground';
import LiveLink from '../Files/LiveLink';
import News from '../Files/News';
import FinanceText from '../Files/FinanceText';
import ModelText from '../Files/ModelText';
import CatalogFon from '../Files/CatalogFon';
import CategoryFon from '../Files/CategoryFon';
import CategoryModelFon from '../Files/CategoryModelFon';
import { Map } from 'immutable';
import MapCont from '../Files/Map';
import Contacts from '../Files/Contacts';
import AboutUs from '../Files/AboutUs';


const Welcome=()=>{
    return(
        <div>
            <h1>Добро пожаловать</h1>
            <h3>Здесь вы можете настраивать ваш сайт</h3>
        </div>
    )
}

const { SubMenu }=Menu;

export class MainOne extends Component {
   
    render() {
        return (
             <div className="main" style={{display:"flex"}}>
               {localStorage.getItem("hello")==="expiliarmus" &&  <div style={{width:"250px"}}>
                    <Menu
                    style={{width:"250px",textAlign:"left",height:"100vh",position:"fixed"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                         <Menu.Item key="1">
                            <Link to="/admin_contacts">
                                <Icon type="file" />
                                <span>Контакты</span>
                            </Link>
                        </Menu.Item>  
                        <Menu.Item key="1.5">
                            <Link to="/admin_aboutus">
                                <Icon type="file" />
                                <span>О нас</span>
                            </Link>
                        </Menu.Item>  
                        <Menu.Item key="2">
                            <Link to="/admin_map">
                                <Icon type="file" />
                                <span>Карта</span>
                            </Link>
                        </Menu.Item>  
                        <Menu.Item key="3">
                        <Link to="/admin_finance_text">
                            <Icon type="file" />
                            <span>Финансирование</span>
                        </Link>
                    </Menu.Item> 
                        <Menu.Item key="4">
                        <Link to="/admin_offers">
                            <Icon type="pie-chart" />
                            <span>Акции и Новости</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="catalog-sub" title={<span><Icon type="file" />Каталог</span>}>
                        <Menu.Item key="5">
                            <Link to="/admin_catalog_fon">
                                <Icon type="file" />
                                <span>Главный баннер</span>
                            </Link>
                        </Menu.Item>  
                        <Menu.Item key="6">
                            <Link to="/admin_category_fon">
                                <Icon type="file" />
                                <span>Баннеры в категориях</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/admin_category_models">
                                <Icon type="file" />
                                <span>Фото в категориях</span>
                            </Link>
                        </Menu.Item>  
                    </SubMenu> 
                    <SubMenu key="models-sub" title={<span><Icon type="file" />Модели</span>}>
                        <Menu.Item key="8">
                            <Link to="/admin_model_text">
                                <Icon type="file" />
                                <span>Текста в моделях</span>
                            </Link>
                        </Menu.Item>  
                        <Menu.Item key="9">
                            <Link to="/admin_file">
                                <Icon type="file" />
                                <span>Файлы в моделях</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to="/admin_background_models">
                                <Icon type="file" />
                                <span>Фото в моделях</span>
                            </Link>
                        </Menu.Item>  
                    </SubMenu> 
                 
                    <Menu.Item key="11">
                        <Link to="/admin_slider_images">
                            <Icon type="desktop" />
                            <span>Картинки слайдера</span>
                        </Link>
                    </Menu.Item>
                  
                    <Menu.Item key="12">
                        <Link to="/admin_test_drive">
                            <Icon type="inbox" />
                            <span>Заявки</span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="4">
                        <Link to="/admin_youtube">
                            <Icon type="youtube" />
                            <span>Youtube ссылка</span>
                        </Link>
                    </Menu.Item> */}
                    
                    {/* <Menu.Item key="7">
                        <Link to="/admin_file_finance">
                            <Icon type="file" />
                            <span>Файлы Финансы</span>
                        </Link>
                    </Menu.Item>   */}
                    <Menu.Item key="13">
                        <Link to="/admin_live_link">
                            <Icon type="file" />
                            <span>Live Link</span>
                        </Link>
                    </Menu.Item>  
                    {/* <Menu.Item key="9">
                        <Link to="/admin_news_photo">
                            <Icon type="file" />
                            <span>Акции и Новости Фон</span>
                        </Link>
                    </Menu.Item>   */}
                       
                    </Menu>
                </div>}
                <div>
                    <Switch>
                        <Route path="/" exact render={(props) => (localStorage.getItem("hello")==="expiliarmus" ? (<Redirect to="/main"/>) : (<LoginFinal {...props}/>))}/>
                        <Route exact path="/main" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SpecialOffersMain/>))}/>
                        <Route exact path="/admin_file" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<FileAll/>))}/>
                        <Route exact path="/admin_live_link" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<LiveLink/>))}/>                        <Route exact path="/admin_model_text" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<ModelText/>))}/>
                        <Route exact path="/admin_finance_text" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<FinanceText/>))}/>
                        {/* <Route exact path="/admin_file_finance" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<FileFinance/>))}/> */}
                        <Route exact path="/admin_background_models" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<ModelBackground/>))}/>
                        <Route exact path="/admin_offers" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SpecialOffersMain/>))}/>
                        {/* <Route exact path="/admin_youtube" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Youtube/>))}/> */}
                        <Route exact path="/admin_slider_images" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Slider/>))}/>
                        <Route exact path="/admin_test_drive" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<TestDrive/>))}/>
                        <Route exact path="/admin_vin_check" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Vin/>))}/>
                        <Route exact path="/admin_questions" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Questions/>))}/>
                        <Route exact path="/subaruxvfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SubaruXVfile/>))}/>
                        <Route exact path="/legacyfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Legacyfile/>))}/>
                        <Route exact path="/outbackfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Outbackfile/>))}/>
                        <Route exact path="/foresterfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Foresterfile/>))}/>
                        <Route exact path="/admin_catalog_fon" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<CatalogFon/>))}/>
                        <Route exact path="/admin_category_fon" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<CategoryFon/>))}/>
                        <Route exact path="/admin_category_models" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<CategoryModelFon/>))}/>
                        <Route exact path="/admin_map" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<MapCont/>))}/>
                        <Route exact path="/admin_contacts" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Contacts/>))}/>
                        <Route exact path="/admin_aboutus" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<AboutUs/>))}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default MainOne;
