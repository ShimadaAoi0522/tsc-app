//画面をテスト上で表示するrenderと、表示内容を探すscreenを読み込み
import { fireEvent, render, screen } from '@testing-library/react'
// テスト用のRouterを読み込み
import { MemoryRouter } from 'react-router-dom'
//テスト用の便利なメソッドを追加するためのimport
import '@testing-library/jest-dom'
// テスト対象のApp.tsxを読み込み
import App from '../../App'

//TitlePageに関するテストをまとめる
describe('TitlePage', () => {
    it('rootページにアクセスしたらTitlePageが表示されること', () => {
        // Appコンポーネントを画面に表示する
        render(
            // 今のURLは / であることをテストの中で設定
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        )
        //画面にTOKYOという見出しが存在することを確認
        expect(screen.getByRole('heading', { name: 'TOKYO' })).toBeInTheDocument()
    })

    it('タイトルページをクリックしたらMainPageに遷移すること', () => {
        // Appコンポーネントを画面に表示する
        render(
            // 今のURLは / であることをテストの中で設定
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        )

        // タイトルページ全体をクリック
        fireEvent.click(screen.getByRole('button'))

        // MainPageの内容が表示されることを確認
        expect(screen.getByRole('heading', { name: '仮ページ' })).toBeInTheDocument()
    })
})
