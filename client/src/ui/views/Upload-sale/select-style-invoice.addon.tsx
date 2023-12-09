export const selectStyleInvoiceAddon = {
    container: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        height: '4rem',
    }),
    indicatorsContainer: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        height: '4rem',
    }),
    control: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        minHeight: '4rem',
        height: '4rem',

        '@media (prefers-color-scheme: dark)': {
            background: 'black',
        },
    }),
    placeholder: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        fontSize: '12px',
    }),
    valueContainer: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        height: '4rem',
    }),
};
