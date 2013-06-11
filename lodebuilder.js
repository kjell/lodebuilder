function draw(options) {
    var lineWidth = Math.min(options.lineWidth || 2, 15);
    var lineRatio = Math.min(options.lineRatio || 5, 20);
    var size = lineWidth * lineRatio;
    var encoder = new GIFEncoder();
    encoder.setRepeat(0); //auto-loop
    encoder.setSize(size, size);
    encoder.setDelay(options.delay || 200);
    encoder.start();

    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var ctx = c.getContext('2d');
    var lw;

    ctx.strokeStyle = options.strokeStyle || '#000';
    ctx.fillStyle = options.fillStyle || '#fff';
    ctx.lineWidth = lineWidth;
    lw = ctx.lineWidth * 1;

    var loops = options.static ? 1 : size;
    var strokeColors = ['#0098C7', '#F78222', '#D81821', '#FEC34F', '#0A9775']
    var colorIndex = 0

    for (var x = 0; x < loops; x++) {
        ctx.fillRect(0, 0, size, size);
        if(x % 2 == 0) {
          ctx.strokeStyle = strokeColors[colorIndex++%strokeColors.length]
        }

        ctx.beginPath();
        ctx.lineTo(x + size - lw, -lw);
        ctx.lineTo(x + size + size + lw, size + lw);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(x - size - lw, -lw);
        ctx.lineTo(x + lw, size + lw);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(x - lw, -lw);
        ctx.lineTo(x + size + lw, size + lw);
        ctx.stroke();

        encoder.addFrame(ctx);
    }

    encoder.finish();
    document.getElementById('big')
        .style.backgroundImage = 'url(data:image/gif;base64,' + encode64(encoder.stream().getData()) + ')';
    document.getElementById('imggif').src = 'data:image/gif;base64,' + encode64(encoder.stream().getData());
    document.getElementById('style')
        .value = 'url(data:image/gif;base64,' + encode64(encoder.stream().getData()) + ')';
}
