export function timeChecker(date1, date2, unit) {
    // Ensure date1 is earlier than date2
    if (date1 > date2) {
        [date1, date2] = [date2, date1]; // Swap values
    }
    //find the difference between two timestamps
    let result

    if (unit === 'hours') {
        const timeDifference = date2 - date1;

        // Convert the time difference from milliseconds to hrs
        const hrsDifference = timeDifference / (1000 * 60 * 60);

        if (hrsDifference >= 36) return true;


        return false

    } else if (unit === 'days') {
        // Calculate the difference in milliseconds between the two dates
        const timeDifference = date2 - date1;

        // Convert the time difference from milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        // console.log('the difference is', daysDifference)
        //the days difference < .5, aka it was met 12 hours ago.
        if (daysDifference < .5) return true;

        // console.log('the difference is', daysDifference)

        return false
    }

    return result
}
