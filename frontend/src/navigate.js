import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMainContext } from './context';

import Main from './screens/Main';
import Loading from './screens/Loading';
import LoadUserInfo from './screens/LoadUserInfo';

import SignIn from './screens/SignIn';
import Verify from './screens/Verify';
import Search from './screens/Search';
import SearchMore from './screens/SearchMore';
import Comments from './screens/Comments';
import Post from './screens/Post';
import User from './screens/User';
import Add from './screens/Add';
import Settings from './screens/Settings';
import Service from './screens/Service';
import Page from './screens/Page';
import Serv from './screens/Serv';
import AddDamage from './screens/AddDamage';

const Navigate = () => {

  const { loading, loadUserInfo } = useMainContext();

  return (
    !loading ?
      ( !loadUserInfo ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/add" element={<Add />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/more" element={<SearchMore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/posts/:id/comments" element={<Comments />} />
            <Route path="/users/:username" element={<User />} />
            <Route path="/services/:id" element={<Service />} />
            <Route path="/page/:id" element={<Page />} />
            <Route path="/serv/:id" element={<Serv />} />
            <Route path="/add-damage/" element={<AddDamage />} />
          </Routes>
        </BrowserRouter>
        : <LoadUserInfo />
      )

    :
      <Loading />
  );
};

export default Navigate;
