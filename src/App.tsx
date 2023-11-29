
import { Provider } from 'react-redux'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import store from './store'
import DefaultLayout from './config/layout/DefaultLayout'
import { ThemeProvider } from '@mui/material'
import defaultTheme from './config/theme/defaultTheme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store'

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
