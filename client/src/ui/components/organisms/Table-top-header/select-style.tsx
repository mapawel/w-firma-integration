export const selectStyle = {
    control: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        borderColor: '#B1B1B1',
        fontSize: '12px',
        fontFamily: '"Open Sans", sans-serif',
        color: '#5F5F5F',
    }),
    option: (baseStyles: {}, state: any) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? '#B1B1B1' : 'white',
        color: state.isFocused ? 'white' : '#5F5F5F',
        fontSize: '12px',
    }),
};
