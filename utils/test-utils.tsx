// test-utils.tsx
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { rootReducer, RootState } from '../store'; // Adjust the import according to your project structure

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof configureStore>;
}

const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {} as Partial<RootState>,
        store = configureStore({ reducer: rootReducer, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => { // Specifying type for children
        return <Provider store={store}>{children}</Provider>;
    };

    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders as render };
