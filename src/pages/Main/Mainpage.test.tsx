import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import MainPage from './MainPage'

describe('MainPage', () => {
    it('MainPageが表示されること', () => {
        render(<MainPage />)

        expect(screen.getByRole('heading', { name: '仮ページ' })).toBeInTheDocument()
    })
})
