export const selectStyle = {
    container: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        height: '3rem',
    }),
    indicatorSeparator: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        display: 'none',
    }),
    indicatorsContainer: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        height: '3rem',
        padding: '0px',
    }),
    control: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        borderColor: '#B1B1B1',
        fontSize: '1.2rem',
        fontFamily: '"Open Sans", sans-serif',
        color: '#5F5F5F',
        minHeight: '3rem',
        height: '3rem',
        background: 'white',
        
        '@media (prefers-color-scheme: dark)': {
            background: 'black',
          },

    }),
    option: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? '#B1B1B1' : 'white',
        color: state.isFocused ? 'white' : '#5F5F5F',
        fontSize: '12px',

        '@media (prefers-color-scheme: dark)': {
            backgroundColor: state.isFocused ? '#5F5F5F' : 'black',
            color: state.isFocused ? 'white' : '#B1B1B1',
          },
    }),
    menu: (baseStyles: {}, state: any) => ({
        ...baseStyles,

        '@media (prefers-color-scheme: dark)': {
            backgroundColor: 'black',
            border: '1px solid #5F5F5F',
          },
    }),
    singleValue: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        color: 'black',
        fontSize: '1.2rem',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 'normal',

        '@media (prefers-color-scheme: dark)': {
            color: 'white',
          },
    }),
    valueContainer: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        margin: '0',
        padding: '0 1.25rem',
        height: '3rem',
    }),
};
