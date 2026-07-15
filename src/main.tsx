import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// index.htmlのid = "root"を取得し，そこにReactアプリを表示
createRoot(document.getElementById('root')!).render(
  // 開発中に問題がないかを確認しやすくするReactの機能
  <StrictMode> 
  {/* URLに応じて表示するページを切り替えられるようにする */}
    <BrowserRouter> 
  {/* Appコンポーネントを表示する*/}
      <App /> 
    </BrowserRouter>
  </StrictMode>,
)
