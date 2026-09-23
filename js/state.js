// Zentrales State Management für Dominik OS 1986
window.DOMINIK_STATE = (function () {
    let activeProgramId = null;
    let isStartMenuOpen = false;
    const listeners = [];

    function notify(eventType) {
        listeners.forEach(fn => {
            try {
                fn(eventType, {
                    activeProgramId,
                    isStartMenuOpen
                });
            } catch (err) {
                console.error('State listener error:', err);
            }
        });
    }

    return {
        getActiveProgramId: function () {
            return activeProgramId;
        },
        isStartMenuOpen: function () {
            return isStartMenuOpen;
        },
        openProgram: function (id) {
            if (activeProgramId === id) return;
            activeProgramId = id;
            isStartMenuOpen = false;
            notify('program:open');
        },
        closeProgram: function () {
            if (activeProgramId === null) return;
            activeProgramId = null;
            notify('program:close');
        },
        toggleStartMenu: function (forceState) {
            isStartMenuOpen = (typeof forceState === 'boolean') ? forceState : !isStartMenuOpen;
            notify('startmenu:toggle');
        },
        closeStartMenu: function () {
            if (!isStartMenuOpen) return;
            isStartMenuOpen = false;
            notify('startmenu:toggle');
        },
        subscribe: function (fn) {
            if (typeof fn === 'function') {
                listeners.push(fn);
            }
        }
    };
})();
