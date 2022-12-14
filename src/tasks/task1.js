process.stdin.on("data", data => {
    data = data.reverse();
    process.stdout.write(data + "\n")
})