import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserWrapper from './user/UserWrapper';
import AdminWrapper from './admin/AdminWrapper';
import AuthProvider from './security/AuthContext';
import '../css/general.css';
import '../css/table.css';
import AppContextProvider from './user/changeable/subcomponents/AppContext';

const BookBazaar = () => {

    return (
        <div className='BookBazaar'>
            <BrowserRouter>
                <AuthProvider>
                    <AppContextProvider>
                        <Routes>
                            <Route path='/admin/*' element={<AdminWrapper />}></Route>
                            <Route path='/*' element={<UserWrapper />}></Route>
                        </Routes>
                    </AppContextProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default BookBazaar;