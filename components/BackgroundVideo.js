const BackgroundVideo = ({
  src = '/1085656-uhd_3840_2160_25fps.mp4',
  overlayOpacity = 0.65
}) => (
  <div className="bg-video" aria-hidden="true">
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="bg-video__media"
    >
      <source src={src} type="video/mp4" />
    </video>
    <div className="bg-video__overlay" />

    <style jsx>{`
      .bg-video {
        position: fixed;
        inset: 0;
        z-index: -2;
        overflow: hidden;
        pointer-events: none;
        background: #020617;
      }

      .bg-video__media {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: saturate(1.1) contrast(1.05);
      }

      .bg-video__overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top, rgba(2, 6, 23, 0), rgba(2, 6, 23, ${overlayOpacity}));
      }

      @media (prefers-reduced-motion: reduce) {
        .bg-video__media {
          display: none;
        }

        .bg-video {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1120 100%);
        }
      }
    `}</style>
  </div>
);

export default BackgroundVideo;

