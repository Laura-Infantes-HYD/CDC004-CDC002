/**
 * @param {query: string} - an elements selector
 * @param {timeOut: number} - time in ms after which the poller will stop looking for the element
 */

export default (cb, timeOutMs = 15000) => {
    
    if (typeof cb !== 'function') return new Error (`${cb} is not a function`);
    if (typeof timeOutMs !== 'number') return new Error (`${timeOutMs} is not a number`);
    
    return new Promise((resolve) => {
        
        let timeOutCount = 0
        let interval = setInterval(()=>timeOutCount = timeOutCount+100, 100)
        
        const wfelem = () => {
            
            if(timeOutCount > timeOutMs){ clearInterval(interval); return }
            
            (cb())
                ? resolve(true)
                : window.requestAnimationFrame(wfelem);

        };

        wfelem();
    });

}

