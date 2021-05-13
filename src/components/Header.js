/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
// import React from "react";
// import { auth, provider } from "../firebase";
// import styled from "styled-components";
// import {
//   selectUserName,
//   selectUserPhoto,
//   setUserLogin,
// } from "../features/user/userSlice";
// import { useSelector, useDispatch } from "react-redux";

// function Header() {
//   const dispatch = useDispatch();
//   const userName = useSelector(selectUserName);
//   const userPhoto = useSelector(selectUserPhoto);

//   const signIn = () => {
//     auth.signInWithPopup(provider).then((result) => {
//       console.log(result);
//       let user = result.user;
//       dispatch(
//         setUserLogin({
//           name: user.diplayName,
//           photo: user.photoURL,
//           email: user.email,
//         })
//       );
//       console.log(user.displayName);
//       console.log(user.photoURL);
//       console.log(user.email);
//     });
//   };
//   console.log(userName);
//   return (
//     <Nav>
//       <Logo src="/images/logo.svg" />
//       {!userName ? (
//         <LoginContainer>
//           <Login onClick={signIn}>LOGIN</Login>
//         </LoginContainer>
//       ) : (
//         <>
//           <NavMenu>
//             <a>
//               <img src="/images/home-icon.svg" />
//               <span>HOME</span>
//             </a>

//             <a>
//               <img src="/images/search-icon.svg" />
//               <span>SEARCH</span>
//             </a>

//             <a>
//               <img src="/images/watchlist-icon.svg" />
//               <span>WATCHLIST</span>
//             </a>

//             <a>
//               <img src="/images/original-icon.svg" />
//               <span>ORIGINALS</span>
//             </a>
//             <a>
//               <img src="/images/movie-icon.svg" />
//               <span>MOVIES</span>
//             </a>
//             <a>
//               <img src="/images/series-icon.svg" />
//               <span>SERIES</span>
//             </a>
//           </NavMenu>
//           <UserImg src="https://instagram.fdel8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/151284041_1416444448725872_4793746364181559970_n.jpg?tp=1&_nc_ht=instagram.fdel8-1.fna.fbcdn.net&_nc_ohc=Ti65inApSiAAX-igRlL&edm=ABfd0MgBAAAA&ccb=7-4&oh=c57056e055d181e837fa55e387262fac&oe=60C08C25&_nc_sid=7bff83" />
//         </>
//       )}
//     </Nav>
//   );
// }

import React, { useEffect } from "react";
import styled from "styled-components";
import {
  selectUserName,
  setUserLogin,
  selectUserPhoto,
  setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu class="topnav" id="myTopnav">
            <a>
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick={signOut} src={userPhoto} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    color: white;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      /* what below code does it adds a div after every span */
      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        /* -6 will push down the div below the span component */
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
        /* cubic-bezier is a special type of transition */
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }

  /* & means this tag in which we are present .clearfix { 
  &:before {
    content: '';
  }
}
Will compile to:

.clearfix:before {
  content: '';
} */
`;

const UserImg = styled.img`
  width: 48px;
  height: 58px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
