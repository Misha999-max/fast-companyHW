export function displayDate(ms) {
    function addZero(num) {
        if (num < 10) num = `0${num}`;
        return num;
    }
    const date = new Date(parseInt(ms));
    const dateNow = new Date();

    const yearDif = dateNow.getFullYear() - date.getFullYear();

    if (yearDif === 0) {
        const dayDif = dateNow.getDate() - date.getDate();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minuteDif = dateNow.getMinutes() - date.getMinutes();
                if (minuteDif >= 0 && minuteDif < 5) return "Только что";

                if (minuteDif >= 5 && minuteDif < 10) {
                    return "пять минут назад";
                }
                if (minuteDif >= 10 && minuteDif < 30) return "20 минут назад";
            }
            return "30 минут назад";
        }
        return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    }
}
