import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar correctamente con valores por defecto', () => {
       const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

        screen.debug()
    });

    test('Debe mostrar a Batman y el valor en el queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']} >
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        // screen.debug()
        const img = screen.getByRole('img');
        expect( img.src ).toContain('assets/heroes/dc-batman.jpg');
        
        const typeAlert = screen.getByLabelText('type-alert');
        expect( typeAlert.style.display ).toBe('none');
    });

    test('Debe mostrar error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        // screen.debug()
        const noHeroAlert = screen.getByLabelText('no-hero-alert');
        expect( noHeroAlert.style.display ).not.toBe('none');
    });
    test('Debe llamar el navigate a la pantalla nueva', () => {
        render(
        <MemoryRouter initialEntries={['/search']}>
            <SearchPage />
        </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        fireEvent.change( input, {target: {name: 'searchText', value: 'superman'}} )

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=superman');

    });
});