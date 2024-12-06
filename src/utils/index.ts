export const getFormattedDate = (date: string, timeStart: string, timeEnd: string): string => {
    const today = new Date();
    const selectedDate = new Date(date);

    // Calcul des différences en jours
    const oneDay = 24 * 60 * 60 * 1000; // Millisecondes dans une journée
    const diffInDays = Math.round((selectedDate.getTime() - today.getTime()) / oneDay);

    // Formats pour les dates
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (diffInDays === 0) {
        return `Today ${timeStart} - ${timeEnd}`;
    } else if (diffInDays === -1) {
        return `Yesterday ${timeStart} - ${timeEnd}`;
    } else if (diffInDays === 1) {
        return `Tomorrow ${timeStart} - ${timeEnd}`;
    } else {
        const day = selectedDate.getDate();
        const month = months[selectedDate.getMonth()];
        const year = selectedDate.getFullYear();

        return `${day} ${month} ${year} ${timeStart} - ${timeEnd}`;
    }
};
