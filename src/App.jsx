import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home, UserBtn } from './component/Home';
import { List, OneNgo } from './component/List';
import { Event } from './component/Event';
import { AboutUs } from './component/AboutUs';
import { OurImpact } from './component/Impact';
import { ContactUs } from './component/ContactUs';
import Header from './component/Header';
import Footer from './component/Footer';
import ScrollToTop from './component/ScrollToTop';
import Login from './component/Forms/Login';
import Register from './component/Forms/Register';
import NgoRegister from './component/Forms/NgoRegister';
import UserRegister from './component/Forms/UserRegister';
import OneNgoField from './component/List/OneNgoField';
import PaymentGateway from './component/Payment/PaymentGateway';
import CountNgo from './component/Home/CountNgo';
import OneEvent from './component/Event/OneEvent';
import UserDashboard from './component/Account/UserDashboard';
import NgoDashboard from './component/Account/NgoDashboard';
import EventEdit from './component/Account/EventEdit';
import EditProfile from './component/Account/EditProfile';
import EditRelatedField from './component/Account/EditRelatedField';
import ViewDonation from './component/Account/ViewDonation';
import GalleryEdit from './component/Account/GalleryEdit';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex">
      {!isHomePage && (
        <div className="w-[15%] hidden md:flex">
          <Header />
        </div>
      )}
      <div className={`${isHomePage ? 'w-full' : 'flex-grow w-[85%]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:id" element={<OneNgo />} />
          <Route path="/events" element={<Event />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ourimpact" element={<OurImpact />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/register/ngo' element={<NgoRegister/>}></Route>
          <Route path='/register/user' element={<UserRegister/>}></Route>
          <Route path={`/list/ngofield/:id`} element={<OneNgoField/>}></Route>
          <Route path='/paymentgateway/:id' element={<PaymentGateway/>}></Route>
          <Route path='/countngo' element={<CountNgo/>}></Route>
          {/* <Route path="/register/event" element={<EventRegister/>}></Route> */}
          <Route path="/events/:id" element={<OneEvent/>}></Route>
          <Route path="/account/user/:id" element={<UserDashboard/>}></Route>
          <Route path="/account/ngo/:id" element={<NgoDashboard/>}></Route>
          <Route path={`/ngo/:id/events`} element={<EventEdit/>}></Route>
          <Route path={`/ngo/edit-profile/:id`} element={<EditProfile/>}></Route>
          <Route path={`/ngo/related-fields/:id`} element={<EditRelatedField/>}></Route>
          <Route path={`/ngo/donations/:id`} element={<ViewDonation/>}></Route>
          <Route path={`/ngo/gallery/:id`} element={<GalleryEdit/>}></Route>


          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default MainApp;
