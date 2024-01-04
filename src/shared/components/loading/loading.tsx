import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.weatherLoading}>
      <svg height="200" width="400" className={styles.fillCloud}>
        <defs>
          <filter id="filter" x="0" y="0">
            <feGaussianBlur stdDeviation=".4" />
          </filter>
        </defs>

        <circle
          cx="200"
          cy="80"
          r="50"
          fill="currentColor"
          filter="url(#filter)"
        />
        <circle
          cx="180"
          cy="120"
          r="40"
          fill="currentColor"
          filter="url(#filter)"
        />
        <circle
          cx="140"
          cy="100"
          r="40"
          fill="currentColor"
          filter="url(#filter)"
        />
        <circle
          cx="230"
          cy="125"
          r="30"
          fill="currentColor"
          filter="url(#filter)"
        />
        <circle
          cx="270"
          cy="115"
          r="35"
          fill="currentColor"
          filter="url(#filter)"
        />
        <circle
          cx="255"
          cy="65"
          r="25"
          fill="currentColor"
          filter="url(#filter)"
        />

        <circle
          cx="160"
          cy="180"
          r="8"
          fill="currentColor"
          filter="url(#filter)"
        />
        <polygon
          points="152,178 168,178 160,159"
          fill="currentColor"
          filter="url(#filter)"
        />

        <circle
          cx="260"
          cy="190"
          r="6"
          fill="currentColor"
          filter="url(#filter)"
        />
        <polygon
          points="254,188 266,188 260,162"
          fill="currentColor"
          filter="url(#filter)"
        />

        <circle cx="100" cy="100" r="40" fill="yellow" className={styles.sun} />
      </svg>
    </div>
  );
};

export default Loading;
