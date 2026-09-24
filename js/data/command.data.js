// MS-DOS 3.30 Dateisystem und Daten für Dominik OS 1986
window.DOMINIK_DATA = window.DOMINIK_DATA || {};

window.DOMINIK_DATA.command = {
    version: 'Microsoft(R) MS-DOS(R) Version 3.30\n(C)Copyright Microsoft Corp 1981-1987\nDominik OS 40th Jubilee DOS-Subsystem geladen.\n',
    files: {
        'GEBURT.TXT': 'GEBURTSEINTRAGUNG NR. 1986-0925:\nName: Dominik\nGeburtsdatum: 25.09.1986\nStatus: Kerngesund, gut gelaunt und von Geburt an mit Star-Potenzial ausgestattet.',
        'CONFIG.SYS': 'DEVICE=C:\\DOS\\WEISHEIT.SYS\nDEVICE=C:\\DRIVERS\\BANDSCHEIBE.DRV /COMFORT\nFILES=40\nBUFFERS=1986\nBREAK=OFF\nDOS=HIGH,UMB',
        'AUTOEXEC.BAT': '@ECHO OFF\nPROMPT $P$G\nPATH C:\\DOS;C:\\PARTY;C:\\WISDOM\nECHO Dominik OS 40.0 wird gestartet...\nCELEBRATE.EXE --LEVEL=40',
        'PUBERT.OLD': 'FEHLER BEIM LESEN: Dieser Ordner ist seit dem 25.09.2004 archiviert und schreibgeschuetzt.',
        'WISDOM.EXE': 'MZ40... [Binaerdatei: Enthaelt 40 Jahre gesammelte Lebenserfahrung, Coolness und Humor.]'
    },
    dirList: [
        { name: 'COMMAND ', ext: 'COM', size: '25307', date: '25-09-86', time: '00:00' },
        { name: 'CONFIG  ', ext: 'SYS', size: '142', date: '25-09-86', time: '00:01' },
        { name: 'AUTOEXEC', ext: 'BAT', size: '128', date: '25-09-86', time: '00:01' },
        { name: 'GEBURT  ', ext: 'TXT', size: '1986', date: '25-09-86', time: '00:05' },
        { name: 'PUBERT  ', ext: 'OLD', size: '90210', date: '25-09-04', time: '12:00' },
        { name: 'WISDOM  ', ext: 'EXE', size: '40960', date: '25-09-26', time: '08:00' }
    ]
};
