
import './App.css'
import AppRoutes from './routes/AppRoutes'
import DefaultLayout from './config/layout/DefaultLayout'
import { ThemeProvider } from '@mui/material'
import defaultTheme from './config/theme/defaultTheme'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'


function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={defaultTheme}>
            <DefaultLayout>
              <AppRoutes />
            </DefaultLayout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
