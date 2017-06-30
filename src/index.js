import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(App)
    })
}