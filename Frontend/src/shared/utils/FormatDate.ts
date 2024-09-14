export const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
        return 'Fecha inválida';
    }

    const year = date.getFullYear();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

    return formattedDate.includes('de') ? formattedDate : `${year}`;
};