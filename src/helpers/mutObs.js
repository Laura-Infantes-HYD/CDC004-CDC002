export default (target, config, cb) => {
    const observer = new MutationObserver((mutations) => {

        cb(mutations)
    }
    )
    observer.observe(target, config);
}