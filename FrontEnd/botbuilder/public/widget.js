(function (window) {
    const BotBuilder = {
        init: function (config) {
            const agentId = config.agentId;
            const primaryColor = config.primaryColor || '#3b82f6';
            const alignment = config.alignment || 'right'; // 'right' or 'left'

            // Inject CSS
            const style = document.createElement('style');
            style.innerHTML = `
        .botbuilder-widget-container {
          position: fixed;
          bottom: 20px;
          ${alignment}: 20px;
          z-index: 9999;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .botbuilder-launcher {
          width: 60px;
          height: 60px;
          background-color: ${primaryColor};
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .botbuilder-launcher:hover {
          transform: scale(1.05);
        }
        .botbuilder-launcher svg {
          width: 30px;
          height: 30px;
          fill: white;
        }
        .botbuilder-iframe-container {
          position: fixed;
          bottom: 100px;
          ${alignment}: 20px;
          width: 380px;
          height: 600px;
          max-height: 80vh;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 9998;
        }
        .botbuilder-iframe-container.open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        @media (max-width: 480px) {
          .botbuilder-iframe-container {
            width: 90%;
            right: 5%;
            left: 5%;
            bottom: 90px;
          }
        }
      `;
            document.head.appendChild(style);

            // Create Container
            const container = document.createElement('div');
            container.className = 'botbuilder-widget-container';

            // Launcher Button
            const launcher = document.createElement('div');
            launcher.className = 'botbuilder-launcher';
            launcher.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      `;

            // Iframe Container
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'botbuilder-iframe-container';
            const iframe = document.createElement('iframe');
            // Point to valid localhost URL for this demo. In prod this would be absolute domain.
            iframe.src = `http://localhost:5173/chat/${agentId}?widget=true`;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframeContainer.appendChild(iframe);

            document.body.appendChild(iframeContainer);
            container.appendChild(launcher);
            document.body.appendChild(container);

            // Toggle Logic
            let isOpen = false;
            launcher.addEventListener('click', () => {
                isOpen = !isOpen;
                if (isOpen) {
                    iframeContainer.classList.add('open');
                    launcher.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          `;
                } else {
                    iframeContainer.classList.remove('open');
                    launcher.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          `;
                }
            });
        }
    };

    window.BotBuilder = BotBuilder;

})(window);
