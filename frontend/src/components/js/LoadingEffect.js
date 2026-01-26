import "../css/LoadingEffect.css"

const LoadingEffect = ({ text = 'Loading ...' }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">{text}</p>
        </div>
    );
};

export default LoadingEffect;