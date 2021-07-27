/*

Get Date and Time informat


     const handleDateInput = (e) => {
        const monthNameDate = (data) => {
            let dd = data.getDate();
            let mm = data.getMonth() + 1;
            const yyyy = data.getFullYear();
            const hrs = data.getHours();
            const min = data.getMinutes();
            const sec = '00';
            if (dd < 10) {
                dd = "0" + dd;
            }
            if (mm < 10) {
                mm = "0" + mm;
            }
            return ` ${yyyy}/${mm}/${dd} ${hrs}:${min}:${sec}`;
        };
        const data = e;
        const Date = monthNameDate(data);
        dispatch(setGrpTime(String(Date)))
    }

const monthNameDate = (data) => {
        let dd = data.getDate();
        let mm = data.getMonth() + 1;
        const yyyy = data.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return `${yyyy}-${mm}-${dd}`;
    };
    const getTime = (data) => {
        const hrs = data.getHours();
        const min = data.getMinutes();
        const sec = '00';
        return `${hrs}:${min}:${sec}`;
    }


*/