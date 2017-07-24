var Docker = Docker || {};

Docker.NetString_SRCDS = function(ip) {
    let netString = '',
        portsUDP = ['1200', '1500', '3005', '3101', '28960', '3478-3479', '4379-4380', '26900-26915', '27000-27030'],
        portsTCP = ['27000-27050'];

    ip = ip.toString().trim();

    if (ip && ip != '0.0.0.0' && ip != 'localhost') {
        ip += ':';
    } else {
        ip = '';
    }

    for (let i in portsUDP) {
        netString += '-p=' + ip + portsUDP[i] + ':' + portsUDP[i] + '/udp ';
    }

    for (let i in portsTCP) {
        netString += '-p=' + ip + portsTCP[i] + ':' + portsTCP[i] + '/tcp ';
    }

    return netString.trim();
}
