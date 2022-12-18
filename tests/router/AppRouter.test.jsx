import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
    test('Debe mostrar el login si NO está autenticado', () => {
        
        const contextValue = {
            logged: false,
        }
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug()
        // expect( screen.getAllByText('Login') ).toBeTruthy();
        expect( screen.getAllByText('Login').length ).toBe(2);
    });

    test('Debe mostrar el componente de Marvel si está auténticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Fernando',
                id: 'ABC'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        screen.debug()
        // expect( screen.getByText('Marvel Comics') ).toBeTruthy();
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
    });
});