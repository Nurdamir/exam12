import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Login from "./features/users/Login";
import Register from "./features/users/Register";

const App = () => {
  // const user = useAppSelector(selectUser);

  return (
      <>
        <CssBaseline/>
        <header>
          <AppToolbar/>
        </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              {/*<Route path="/" element={<Gallery/>}/>*/}
              {/*<Route*/}
              {/*    path="/cocktails/add"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute isAllowed={user !== null}>*/}
              {/*        <AddCocktail />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*/>*/}
              {/*<Route path="/cocktails/:id" element={<FullCocktail/>}/>*/}
              {/*<Route*/}
              {/*    path="/myCocktails"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute isAllowed={user !== null}>*/}
              {/*        <Cocktails myId={user?._id} />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*/>*/}
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<h1>Not found!</h1>}/>
            </Routes>
          </Container>
        </main>
      </>
  );
}
export default App;
