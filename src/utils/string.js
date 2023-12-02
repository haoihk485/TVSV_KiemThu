export function truncate(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}


export function dateFormat(input) {
    var date = new Date(input);

    var gio = date.getHours();
    var phut = date.getMinutes();
    var giay = date.getSeconds();

    var ngay = date.getDate();
    var thang = date.getMonth() + 1;
    var nam = date.getFullYear();

    var gioDinhDang = gio < 10 ? '0' + gio : gio;
    var phutDinhDang = phut < 10 ? '0' + phut : phut;
    var giayDinhDang = giay < 10 ? '0' + giay : giay;

    var ngayDinhDang = ngay < 10 ? '0' + ngay : ngay;
    var thangDinhDang = thang < 10 ? '0' + thang : thang;

    var result = `${gioDinhDang}:${phutDinhDang}:${giayDinhDang} ${ngayDinhDang}-${thangDinhDang}-${nam}`;

    return result;
}