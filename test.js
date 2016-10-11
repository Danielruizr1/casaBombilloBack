/*!
 * froala_editor v2.3.4 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function(a) {
    "use strict";
    a.extend(a.FE.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_]"
    }), a.extend(a.FE.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
        tableInsertButtons: ["tableBack", "|"],
        tableResizer: !0,
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: ["tableBack", "|"],
        tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        tableColorsStep: 7,
        tableCellStyles: {
            "fr-highlighted": "Highlighted",
            "fr-thick": "Thick"
        },
        tableStyles: {
            "fr-dashed-borders": "Dashed Borders",
            "fr-alternate-rows": "Alternate Rows"
        },
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), a.FE.PLUGINS.table = function(b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertTable"]'),
                c = b.popups.get("table.insert");
            if (c || (c = g()), !c.hasClass("fr-active")) {
                b.popups.refresh("table.insert"), b.popups.setContainer("table.insert", b.$tb);
                var d = a.offset().left + a.outerWidth() / 2,
                    e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("table.insert", d, e, a.outerHeight())
            }
        }

        function d() {
            var c = F();
            if (c) {
                var d = b.popups.get("table.edit");
                d || (d = i()), b.popups.setContainer("table.edit", a(b.opts.scrollableContainer));
                var e = M(c),
                    f = (e.left + e.right) / 2,
                    g = e.bottom;
                b.popups.show("table.edit", f, g, e.bottom - e.top), b.edit.isDisabled() && (b.toolbar.disable(), b.$el.removeClass("fr-no-selection"), b.edit.on(), b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)), b.selection.restore(), b.button.bulkRefresh())
            }
        }

        function e() {
            var c = F();
            if (c) {
                var d = b.popups.get("table.colors");
                d || (d = j()), b.popups.setContainer("table.colors", a(b.opts.scrollableContainer));
                var e = M(c),
                    f = (e.left + e.right) / 2,
                    g = e.bottom;
                l(), b.popups.show("table.colors", f, g, e.bottom - e.top)
            }
        }

        function f() {
            0 === ka().length && b.toolbar.enable()
        }

        function g(c) {
            if (c) return b.popups.onHide("table.insert", function() {
                b.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")
            }), !0;
            var d = "";
            b.opts.tableInsertButtons.length > 0 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableInsertButtons) + "</div>");
            var e = {
                    buttons: d,
                    rows_columns: h()
                },
                f = b.popups.create("table.insert", e);
            return b.events.$on(f, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function(c) {
                var d = a(c.currentTarget),
                    e = d.data("row"),
                    f = d.data("col"),
                    g = d.parent();
                g.siblings(".fr-table-size-info").html(e + " &times; " + f), g.find("> span").removeClass("hover");
                for (var h = 1; h <= b.opts.tableInsertMaxSize; h++)
                    for (var i = 0; i <= b.opts.tableInsertMaxSize; i++) {
                        var j = g.find('> span[data-row="' + h + '"][data-col="' + i + '"]');
                        e >= h && f >= i ? j.addClass("hover") : e + 1 >= h || 2 >= h && !b.helpers.isMobile() ? j.css("display", "inline-block") : h > 2 && !b.helpers.isMobile() && j.css("display", "none")
                    }
            }, !0), f
        }

        function h() {
            for (var a = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', c = 1; c <= b.opts.tableInsertMaxSize; c++) {
                for (var d = 1; d <= b.opts.tableInsertMaxSize; d++) {
                    var e = "inline-block";
                    c > 2 && !b.helpers.isMobile() && (e = "none");
                    var f = "fr-table-cell ";
                    1 == c && 1 == d && (f += " hover"), a += '<span class="fr-command ' + f + '" data-cmd="tableInsert" data-row="' + c + '" data-col="' + d + '" data-param1="' + c + '" data-param2="' + d + '" style="display: ' + e + ';"><span></span></span>'
                }
                a += '<div class="new-line"></div>'
            }
            return a += "</div></div>"
        }

        function i(a) {
            if (a) return b.popups.onHide("table.edit", f), !0;
            var c = "";
            b.opts.tableEditButtons.length > 0 && (c = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableEditButtons) + "</div>");
            var e = {
                    buttons: c
                },
                g = b.popups.create("table.edit", e);
            return b.events.$on(b.$wp, "scroll.table-edit", function() {
                b.popups.isVisible("table.edit") && d()
            }), g
        }

        function j() {
            var a = "";
            b.opts.tableColorsButtons.length > 0 && (a = '<div class="fr-buttons fr-table-colors-buttons">' + b.button.buildList(b.opts.tableColorsButtons) + "</div>");
            var c = {
                    buttons: a,
                    colors: k()
                },
                d = b.popups.create("table.colors", c);
            return b.events.$on(b.$wp, "scroll.table-colors", function() {
                b.popups.isVisible("table.colors") && e()
            }), d
        }

        function k() {
            for (var a = '<div class="fr-table-colors">', c = 0; c < b.opts.tableColors.length; c++) 0 !== c && c % b.opts.tableColorsStep === 0 && (a += "<br>"), a += "REMOVE" != b.opts.tableColors[c] ? '<span class="fr-command" style="background: ' + b.opts.tableColors[c] + ';" data-cmd="tableCellBackgroundColor" data-param1="' + b.opts.tableColors[c] + '"></span>' : '<span class="fr-command" data-cmd="tableCellBackgroundColor" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '"><i class="fa fa-eraser"></i></span>';
            return a += "</div>"
        }

        function l() {
            var a = b.popups.get("table.colors"),
                c = b.$el.find(".fr-selected-cell:first");
            a.find(".fr-selected-color").removeClass("fr-selected-color"), a.find('span[data-param1="' + b.helpers.RGBToHex(c.css("background-color")) + '"]').addClass("fr-selected-color")
        }

        function m(c, d) {
            var e, f, g = '<table style="width: 100%;"><tbody>',
                h = 100 / d;
            for (e = 0; c > e; e++) {
                for (g += "<tr>", f = 0; d > f; f++) g += '<td style="width: ' + h.toFixed(4) + '%;">', 0 === e && 0 === f && (g += a.FE.MARKERS), g += "<br></td>";
                g += "</tr>"
            }
            g += "</tbody></table>", b.html.insert(g), b.selection.restore()
        }

        function n() {
            if (ka().length > 0) {
                var a = la();
                b.selection.setBefore(a.get(0)) || b.selection.setAfter(a.get(0)), b.selection.restore(), b.popups.hide("table.edit"), a.remove(), b.toolbar.enable()
            }
        }

        function o() {
            var b = la();
            if (b.length > 0 && 0 === b.find("th").length) {
                var c, e = "<thead><tr>",
                    f = 0;
                for (b.find("tr:first > td").each(function() {
                        var b = a(this);
                        f += parseInt(b.attr("colspan"), 10) || 1
                    }), c = 0; f > c; c++) e += "<th><br></th>";
                e += "</tr></thead>", b.prepend(e), d()
            }
        }

        function p() {
            var a = la(),
                c = a.find("thead");
            if (c.length > 0)
                if (0 === a.find("tbody tr").length) n();
                else if (c.remove(), ka().length > 0) d();
            else {
                b.popups.hide("table.edit");
                var e = a.find("tbody tr:first td:first").get(0);
                e && (b.selection.setAtEnd(e), b.selection.restore())
            }
        }

        function q(c) {
            var e = la();
            if (e.length > 0) {
                if (b.$el.find("th.fr-selected-cell").length > 0 && "above" == c) return;
                var f, g, h = F(),
                    i = K(h);
                g = "above" == c ? i.min_i : i.max_i;
                var j = "<tr>";
                for (f = 0; f < h[g].length; f++)
                    if ("below" == c && g < h.length - 1 && h[g][f] == h[g + 1][f] || "above" == c && g > 0 && h[g][f] == h[g - 1][f]) {
                        if (0 === f || f > 0 && h[g][f] != h[g][f - 1]) {
                            var k = a(h[g][f]);
                            k.attr("rowspan", parseInt(k.attr("rowspan"), 10) + 1)
                        }
                    } else j += "<td><br></td>";
                j += "</tr>";
                var l = a(e.find("tr").not(e.find("table tr")).get(g));
                "below" == c ? l.after(j) : "above" == c && (l.before(j), b.popups.isVisible("table.edit") && d())
            }
        }

        function r() {
            var c = la();
            if (c.length > 0) {
                var d, e, f, g = F(),
                    h = K(g);
                if (0 === h.min_i && h.max_i == g.length - 1) n();
                else {
                    for (d = h.max_i; d >= h.min_i; d--) {
                        for (f = a(c.find("tr").not(c.find("table tr")).get(d)), e = 0; e < g[d].length; e++)
                            if (0 === e || g[d][e] != g[d][e - 1]) {
                                var i = a(g[d][e]);
                                if (parseInt(i.attr("rowspan"), 10) > 1) {
                                    var j = parseInt(i.attr("rowspan"), 10) - 1;
                                    1 == j ? i.removeAttr("rowspan") : i.attr("rowspan", j)
                                }
                                if (d < g.length - 1 && g[d][e] == g[d + 1][e] && (0 === d || g[d][e] != g[d - 1][e])) {
                                    for (var k = g[d][e], l = e; l > 0 && g[d][l] == g[d][l - 1];) l--;
                                    0 === l ? a(c.find("tr").not(c.find("table tr")).get(d + 1)).prepend(k) : a(g[d + 1][l - 1]).after(k)
                                }
                            }
                        var m = f.parent();
                        f.remove(), 0 === m.find("tr").length && m.remove(), g = F(c)
                    }
                    x(0, g.length - 1, 0, g[0].length - 1, c), h.min_i > 0 ? b.selection.setAtEnd(g[h.min_i - 1][0]) : b.selection.setAtEnd(g[0][0]), b.selection.restore(), b.popups.hide("table.edit")
                }
            }
        }

        function s(c) {
            var e = la();
            if (e.length > 0) {
                var f, g = F(),
                    h = K(g);
                f = "before" == c ? h.min_j : h.max_j;
                var i, j = 100 / g[0].length,
                    k = 100 / (g[0].length + 1);
                e.find("th, td").each(function() {
                    i = a(this), i.data("old-width", i.outerWidth() / e.outerWidth() * 100)
                }), e.find("tr").not(e.find("table tr")).each(function(b) {
                    for (var d, e = a(this), h = 0, i = 0; f > h - 1;) {
                        if (d = e.find("> th, > td").get(i), !d) {
                            d = null;
                            break
                        }
                        d == g[b][h] ? (h += parseInt(a(d).attr("colspan"), 10) || 1, i++) : (h += parseInt(a(g[b][h]).attr("colspan"), 10) || 1, "after" == c && (d = 0 === i ? -1 : e.find("> th, > td").get(i - 1)))
                    }
                    var l = a(d);
                    if ("after" == c && h - 1 > f || "before" == c && f > 0 && g[b][f] == g[b][f - 1]) {
                        if (0 === b || b > 0 && g[b][f] != g[b - 1][f]) {
                            var m = parseInt(l.attr("colspan"), 10) + 1;
                            l.attr("colspan", m), l.css("width", (l.data("old-width") * k / j + k).toFixed(4) + "%"), l.removeData("old-width")
                        }
                    } else {
                        var n;
                        n = e.find("th").length > 0 ? '<th style="width: ' + k.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + k.toFixed(4) + '%;"><br></td>', -1 == d ? e.prepend(n) : null == d ? e.append(n) : "before" == c ? l.before(n) : "after" == c && l.after(n)
                    }
                }), e.find("th, td").each(function() {
                    i = a(this), i.data("old-width") && (i.css("width", (i.data("old-width") * k / j).toFixed(4) + "%"), i.removeData("old-width"))
                }), b.popups.isVisible("table.edit") && d()
            }
        }

        function t() {
            var c = la();
            if (c.length > 0) {
                var d, e, f, g = F(),
                    h = K(g);
                if (0 === h.min_j && h.max_j == g[0].length - 1) n();
                else {
                    var i = 100 / g[0].length,
                        j = 100 / (g[0].length - h.max_j + h.min_j - 1);
                    for (c.find("th, td").each(function() {
                            f = a(this), f.hasClass("fr-selected-cell") || f.data("old-width", f.outerWidth() / c.outerWidth() * 100)
                        }), e = h.max_j; e >= h.min_j; e--)
                        for (d = 0; d < g.length; d++)
                            if (0 === d || g[d][e] != g[d - 1][e])
                                if (f = a(g[d][e]), (parseInt(f.attr("colspan"), 10) || 1) > 1) {
                                    var k = parseInt(f.attr("colspan"), 10) - 1;
                                    1 == k ? f.removeAttr("colspan") : f.attr("colspan", k), f.css("width", ((f.data("old-width") - ca(e, g)) * j / i).toFixed(4) + "%"), f.removeData("old-width")
                                } else {
                                    var l = a(f.parent().get(0));
                                    f.remove(), 0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                                }
                    x(0, g.length - 1, 0, g[0].length - 1, c), h.min_j > 0 ? b.selection.setAtEnd(g[h.min_i][h.min_j - 1]) : b.selection.setAtEnd(g[h.min_i][0]), b.selection.restore(), b.popups.hide("table.edit"), c.find("th, td").each(function() {
                        f = a(this), f.data("old-width") && (f.css("width", (f.data("old-width") * j / i).toFixed(4) + "%"), f.removeData("old-width"))
                    })
                }
            }
        }

        function u(a, b, c) {
            var d, e, f, g, h, i = 0,
                j = F(c);
            for (b = Math.min(b, j[0].length - 1), e = a; b >= e; e++)
                if (!(e > a && j[0][e] == j[0][e - 1]) && (g = parseInt(j[0][e].getAttribute("colspan"), 10) || 1, g > 1 && j[0][e] == j[0][e + 1]))
                    for (i = g - 1, d = 1; d < j.length; d++)
                        if (j[d][e] != j[d - 1][e]) {
                            for (f = e; e + g > f; f++)
                                if (h = parseInt(j[d][f].getAttribute("colspan"), 10) || 1, h > 1 && j[d][f] == j[d][f + 1]) i = Math.min(i, h - 1), f += i;
                                else if (i = Math.max(0, i - 1), !i) break;
                            if (!i) break
                        }
            i && w(j, i, "colspan", 0, j.length - 1, a, b)
        }

        function v(a, b, c) {
            var d, e, f, g, h, i = 0,
                j = F(c);
            for (b = Math.min(b, j.length - 1), d = a; b >= d; d++)
                if (!(d > a && j[d][0] == j[d - 1][0]) && (g = parseInt(j[d][0].getAttribute("rowspan"), 10) || 1, g > 1 && j[d][0] == j[d + 1][0]))
                    for (i = g - 1, e = 1; e < j[0].length; e++)
                        if (j[d][e] != j[d][e - 1]) {
                            for (f = d; d + g > f; f++)
                                if (h = parseInt(j[f][e].getAttribute("rowspan"), 10) || 1, h > 1 && j[f][e] == j[f + 1][e]) i = Math.min(i, h - 1), f += i;
                                else if (i = Math.max(0, i - 1), !i) break;
                            if (!i) break
                        }
            i && w(j, i, "rowspan", a, b, 0, j[0].length - 1)
        }

        function w(a, b, c, d, e, f, g) {
            var h, i, j;
            for (h = d; e >= h; h++)
                for (i = f; g >= i; i++) h > d && a[h][i] == a[h - 1][i] || i > f && a[h][i] == a[h][i - 1] || (j = parseInt(a[h][i].getAttribute(c), 10) || 1, j > 1 && (j - b > 1 ? a[h][i].setAttribute(c, j - b) : a[h][i].removeAttribute(c)))
        }

        function x(a, b, c, d, e) {
            v(a, b, e), u(c, d, e)
        }

        function y() {
            if (ka().length > 1 && (0 === b.$el.find("th.fr-selected-cell").length || 0 === b.$el.find("td.fr-selected-cell").length)) {
                var c, e, f = F(),
                    g = K(f),
                    h = b.$el.find(".fr-selected-cell"),
                    i = a(h[0]),
                    j = i.parent(),
                    k = j.find(".fr-selected-cell"),
                    l = i.closest("table"),
                    m = i.html(),
                    n = 0;
                for (c = 0; c < k.length; c++) n += a(k[c]).outerWidth();
                for (i.css("width", (n / l.outerWidth() * 100).toFixed(4) + "%"), g.min_j < g.max_j && i.attr("colspan", g.max_j - g.min_j + 1), g.min_i < g.max_i && i.attr("rowspan", g.max_i - g.min_i + 1), c = 1; c < h.length; c++) e = a(h[c]), "<br>" != e.html() && "" !== e.html() && (m += "<br>" + e.html()), e.remove();
                i.html(m), b.selection.setAtEnd(i.get(0)), b.selection.restore(), b.toolbar.enable(), v(g.min_i, g.max_i, l);
                var o = l.find("tr:empty");
                for (c = o.length - 1; c >= 0; c--) a(o[c]).remove();
                u(g.min_j, g.max_j, l), d()
            }
        }

        function z() {
            if (1 == ka().length) {
                var c = b.$el.find(".fr-selected-cell"),
                    d = c.parent(),
                    e = c.closest("table"),
                    f = parseInt(c.attr("rowspan"), 10),
                    g = F(),
                    h = G(c.get(0), g),
                    i = c.clone().html("<br>");
                if (f > 1) {
                    var j = Math.ceil(f / 2);
                    j > 1 ? c.attr("rowspan", j) : c.removeAttr("rowspan"), f - j > 1 ? i.attr("rowspan", f - j) : i.removeAttr("rowspan");
                    for (var k = h.row + j, l = 0 === h.col ? h.col : h.col - 1; l >= 0 && (g[k][l] == g[k][l - 1] || k > 0 && g[k][l] == g[k - 1][l]);) l--; - 1 == l ? a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i) : a(g[k][l]).after(i)
                } else {
                    var m, n = a("<tr>").append(i);
                    for (m = 0; m < g[0].length; m++)
                        if (0 === m || g[h.row][m] != g[h.row][m - 1]) {
                            var o = a(g[h.row][m]);
                            o.is(c) || o.attr("rowspan", (parseInt(o.attr("rowspan"), 10) || 1) + 1)
                        }
                    d.after(n)
                }
                I(), b.popups.hide("table.edit")
            }
        }

        function A() {
            if (1 == ka().length) {
                var c = b.$el.find(".fr-selected-cell"),
                    d = parseInt(c.attr("colspan"), 10) || 1,
                    e = c.parent().outerWidth(),
                    f = c.outerWidth(),
                    g = c.clone().html("<br>"),
                    h = F(),
                    i = G(c.get(0), h);
                if (d > 1) {
                    var j = Math.ceil(d / 2);
                    f = da(i.col, i.col + j - 1, h) / e * 100;
                    var k = da(i.col + j, i.col + d - 1, h) / e * 100;
                    j > 1 ? c.attr("colspan", j) : c.removeAttr("colspan"), d - j > 1 ? g.attr("colspan", d - j) : g.removeAttr("colspan"), c.css("width", f.toFixed(4) + "%"), g.css("width", k.toFixed(4) + "%")
                } else {
                    var l;
                    for (l = 0; l < h.length; l++)
                        if (0 === l || h[l][i.col] != h[l - 1][i.col]) {
                            var m = a(h[l][i.col]);
                            if (!m.is(c)) {
                                var n = (parseInt(m.attr("colspan"), 10) || 1) + 1;
                                m.attr("colspan", n)
                            }
                        }
                    f = f / e * 100 / 2, c.css("width", f.toFixed(4) + "%"), g.css("width", f.toFixed(4) + "%")
                }
                c.after(g), I(), b.popups.hide("table.edit")
            }
        }

        function B(a) {
            "REMOVE" != a ? b.$el.find(".fr-selected-cell").css("background-color", b.helpers.HEXtoRGB(a)) : b.$el.find(".fr-selected-cell").css("background-color", "")
        }

        function C(a) {
            b.$el.find(".fr-selected-cell").css("vertical-align", a)
        }

        function D(a) {
            b.$el.find(".fr-selected-cell").css("text-align", a)
        }

        function E(a, b, c, d) {
            if (b.length > 0) {
                if (!c) {
                    var e = Object.keys(d);
                    e.splice(e.indexOf(a), 1), b.removeClass(e.join(" "))
                }
                b.toggleClass(a)
            }
        }

        function F(b) {
            b = b || null;
            var c = [];
            return null == b && ka().length > 0 && (b = la()), b ? (b.find("tr").not(b.find("table tr")).each(function(b, d) {
                var e = a(d),
                    f = 0;
                e.find("> th, > td").each(function(d, e) {
                    for (var g = a(e), h = parseInt(g.attr("colspan"), 10) || 1, i = parseInt(g.attr("rowspan"), 10) || 1, j = b; b + i > j; j++)
                        for (var k = f; f + h > k; k++) c[j] || (c[j] = []), c[j][k] ? f++ : c[j][k] = e;
                    f += h
                })
            }), c) : void 0
        }

        function G(a, b) {
            for (var c = 0; c < b.length; c++)
                for (var d = 0; d < b[c].length; d++)
                    if (b[c][d] == a) return {
                        row: c,
                        col: d
                    }
        }

        function H(a, b, c) {
            for (var d = a + 1, e = b + 1; d < c.length;) {
                if (c[d][b] != c[a][b]) {
                    d--;
                    break
                }
                d++
            }
            for (d == c.length && d--; e < c[a].length;) {
                if (c[a][e] != c[a][b]) {
                    e--;
                    break
                }
                e++
            }
            return e == c[a].length && e--, {
                row: d,
                col: e
            }
        }

        function I() {
            var c = b.$el.find(".fr-selected-cell");
            c.length > 0 && c.each(function() {
                var b = a(this);
                b.removeClass("fr-selected-cell"), "" === b.attr("class") && b.removeAttr("class")
            })
        }

        function J() {
            setTimeout(function() {
                b.selection.clear(), b.$el.addClass("fr-no-selection"), b.$el.blur()
            }, 0)
        }

        function K(a) {
            var c, d = a.length,
                e = 0,
                f = a[0].length,
                g = 0,
                h = b.$el.find(".fr-selected-cell");
            for (c = 0; c < h.length; c++) {
                var i = G(h[c], a),
                    j = H(i.row, i.col, a);
                d = Math.min(i.row, d), e = Math.max(j.row, e), f = Math.min(i.col, f), g = Math.max(j.col, g)
            }
            return {
                min_i: d,
                max_i: e,
                min_j: f,
                max_j: g
            }
        }

        function L(b, c, d, e, f) {
            var g, h, i, j, k = b,
                l = c,
                m = d,
                n = e;
            for (g = k; l >= g; g++)((parseInt(a(f[g][m]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][m]).attr("colspan"), 10) || 1) > 1) && (i = G(f[g][m], f), j = H(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[g][n]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][n]).attr("colspan"), 10) || 1) > 1) && (i = G(f[g][n], f), j = H(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            for (h = m; n >= h; h++)((parseInt(a(f[k][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[k][h]).attr("colspan"), 10) || 1) > 1) && (i = G(f[k][h], f), j = H(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[l][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[l][h]).attr("colspan"), 10) || 1) > 1) && (i = G(f[l][h], f), j = H(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            return k == b && l == c && m == d && n == e ? {
                min_i: b,
                max_i: c,
                min_j: d,
                max_j: e
            } : L(k, l, m, n, f)
        }

        function M(b) {
            var c = K(b),
                d = a(b[c.min_i][c.min_j]),
                e = a(b[c.min_i][c.max_j]),
                f = a(b[c.max_i][c.min_j]),
                g = d.offset().left,
                h = e.offset().left + e.outerWidth(),
                i = d.offset().top,
                j = f.offset().top + f.outerHeight();
            return {
                left: g,
                right: h,
                top: i,
                bottom: j
            }
        }

        function N(c, d) {
            if (a(c).is(d)) I(), b.edit.on(), a(c).addClass("fr-selected-cell");
            else {
                J(), b.edit.off();
                var e = F(),
                    f = G(c, e),
                    g = G(d, e),
                    h = L(Math.min(f.row, g.row), Math.max(f.row, g.row), Math.min(f.col, g.col), Math.max(f.col, g.col), e);
                I();
                for (var i = h.min_i; i <= h.max_i; i++)
                    for (var j = h.min_j; j <= h.max_j; j++) a(e[i][j]).addClass("fr-selected-cell")
            }
        }

        function O(c) {
            var d = null,
                e = a(c.target);
            return "TD" == c.target.tagName || "TH" == c.target.tagName ? d = c.target : e.closest("td").length > 0 ? d = e.closest("td").get(0) : e.closest("th").length > 0 && (d = e.closest("th").get(0)), 0 === b.$el.find(d).length ? null : d
        }

        function P() {
            I(), b.popups.hide("table.edit")
        }

        function Q(c) {
            var d = O(c);
            if (ka().length > 0 && !d && P(), !b.edit.isDisabled() || b.popups.isVisible("table.edit"))
                if (1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)(3 == c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) && d && P();
                else if (qa = !0, d) {
                ka().length > 0 && !c.shiftKey && P(), c.stopPropagation(), b.events.trigger("image.hideResizer"), b.events.trigger("video.hideResizer"), pa = !0;
                var e = d.tagName.toLowerCase();
                c.shiftKey && b.$el.find(e + ".fr-selected-cell").length > 0 ? a(b.$el.find(e + ".fr-selected-cell").closest("table")).is(a(d).closest("table")) ? N(ra, d) : J() : ((b.keys.ctrlKey(c) || c.shiftKey) && (ka().length > 1 || 0 === a(d).find(b.selection.element()).length && !a(d).is(b.selection.element())) && J(), ra = d, N(ra, ra))
            }
        }

        function R(c) {
            if (pa || b.$tb.is(c.target) || b.$tb.is(a(c.target).closest(b.$tb.get(0))) || (ka().length > 0 && b.toolbar.enable(), I()), !(1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)) {
                if (qa = !1, pa) {
                    pa = !1;
                    var e = O(c);
                    e || 1 != ka().length ? ka().length > 0 && (b.selection.isCollapsed() ? d() : I()) : I()
                }
                if (ta) {
                    ta = !1, na.removeClass("fr-moving"), b.$el.removeClass("fr-no-selection"), b.edit.on();
                    var f = parseFloat(na.css("left")) + b.opts.tableResizerOffset;
                    b.opts.iframe && (f -= b.$iframe.offset().left), na.data("release-position", f), na.removeData("max-left"), na.removeData("max-right"), ba(c), V()
                }
            }
        }

        function S(c) {
            if (pa === !0) {
                var d = a(c.currentTarget);
                if (d.closest("table").is(la())) {
                    if ("TD" == c.currentTarget.tagName && 0 === b.$el.find("th.fr-selected-cell").length) return void N(ra, c.currentTarget);
                    if ("TH" == c.currentTarget.tagName && 0 === b.$el.find("td.fr-selected-cell").length) return void N(ra, c.currentTarget)
                }
                J()
            }
        }

        function T(a) {
            (37 == a.which || 38 == a.which || 39 == a.which || 40 == a.which) && ka().length > 0 && P()
        }

        function U() {
            b.shared.$table_resizer || (b.shared.$table_resizer = a('<div class="fr-table-resizer"><div></div></div>')), na = b.shared.$table_resizer, b.events.$on(na, "mousedown", function(a) {
                return b.core.sameInstance(na) ? (ka().length > 0 && P(), 1 == a.which ? (ta = !0, na.addClass("fr-moving"), J(), b.edit.off(), na.find("div").css("opacity", 1), !1) : void 0) : !0
            }), b.events.$on(na, "mousemove", function(a) {
                return b.core.sameInstance(na) ? void(ta && (b.opts.iframe && (a.pageX -= b.$iframe.offset().left), ea(a))) : !0
            }), b.events.on("shared.destroy", function() {
                na.html("").removeData().remove(), na = null
            }, !0), b.events.on("destroy", function() {
                b.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), na.hide().appendTo(a("body"))
            }, !0)
        }

        function V() {
            na && (na.find("div").css("opacity", 0), na.css("top", 0), na.css("left", 0), na.css("height", 0), na.find("div").css("height", 0), na.hide())
        }

        function W() {
            oa && oa.removeClass("fr-visible").css("left", "-9999px")
        }

        function X(c, d) {
            var e = a(d),
                f = e.closest("table"),
                g = f.parent();
            if (d && "TD" != d.tagName && "TH" != d.tagName && (e.closest("td").length > 0 ? d = e.closest("td") : e.closest("th").length > 0 && (d = e.closest("th"))), !d || "TD" != d.tagName && "TH" != d.tagName) na && e.get(0) != na.get(0) && e.parent().get(0) != na.get(0) && b.core.sameInstance(na) && V();
            else {
                if (e = a(d), 0 === b.$el.find(e).length) return !1;
                var h = e.offset().left - 1,
                    i = h + e.outerWidth();
                if (Math.abs(c.pageX - h) <= b.opts.tableResizerOffset || Math.abs(i - c.pageX) <= b.opts.tableResizerOffset) {
                    var j, k, l, m, n, o = F(f),
                        p = G(d, o),
                        q = H(p.row, p.col, o),
                        r = f.offset().top,
                        s = f.outerHeight() - 1;
                    "rtl" != b.opts.direction ? p.col > 0 && c.pageX - h <= b.opts.tableResizerOffset ? (l = h, m = h - ca(p.col - 1, o) + b.opts.tableResizingLimit, n = h + ca(p.col, o) - b.opts.tableResizingLimit, j = p.col - 1, k = p.col) : i - c.pageX <= b.opts.tableResizerOffset && (l = i, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = i - ca(q.col, o) + b.opts.tableResizingLimit, n = i + ca(q.col + 1, o) - b.opts.tableResizingLimit, j = q.col, k = q.col + 1) : (j = q.col, k = null, m = f.offset().left - 1 + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : p.col > 0 && i - c.pageX <= b.opts.tableResizerOffset ? (l = i, m = i - ca(p.col, o) + b.opts.tableResizingLimit, n = i + ca(p.col - 1, o) - b.opts.tableResizingLimit, j = p.col, k = p.col - 1) : c.pageX - h <= b.opts.tableResizerOffset && (l = h, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = h - ca(q.col + 1, o) + b.opts.tableResizingLimit, n = h + ca(q.col, o) - b.opts.tableResizingLimit, j = q.col + 1, k = q.col) : (j = null, k = q.col, m = g.offset().left + parseFloat(g.css("padding-left")), n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")) - o[0].length * b.opts.tableResizingLimit)), na || U(), na.data("table", f), na.data("first", j), na.data("second", k), na.data("instance", b), b.$wp.append(na);
                    var t = l - b.win.pageXOffset - b.opts.tableResizerOffset,
                        u = r - b.win.pageYOffset;
                    b.opts.iframe && (t += b.$iframe.offset().left - a(b.o_win).scrollLeft(), u += b.$iframe.offset().top - a(b.o_win).scrollTop(), m += b.$iframe.offset().left, n += b.$iframe.offset().left), na.data("max-left", m), na.data("max-right", n), na.data("origin", l - b.win.pageXOffset), na.css("top", u), na.css("left", t), na.css("height", s), na.find("div").css("height", s), na.css("padding-left", b.opts.tableResizerOffset), na.css("padding-right", b.opts.tableResizerOffset), na.show()
                } else b.core.sameInstance(na) && V()
            }
        }

        function Y(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            oa || ha(), b.$box.append(oa), oa.data("instance", b);
            var e = a(d),
                f = e.find("tr:first"),
                g = c.pageX,
                h = 0,
                i = 0;
            b.opts.iframe && (h += b.$iframe.offset().left - a(b.o_win).scrollLeft(), i += b.$iframe.offset().top - a(b.o_win).scrollTop());
            var j;
            f.find("th, td").each(function() {
                var c = a(this);
                return c.offset().left <= g && g < c.offset().left + c.outerWidth() / 2 ? (j = parseInt(oa.find("a").css("width"), 10), oa.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), oa.css("left", h + c.offset().left - b.win.pageXOffset - j / 2), oa.data("selected-cell", c), oa.data("position", "before"), oa.addClass("fr-visible"), !1) : c.offset().left + c.outerWidth() / 2 <= g && g < c.offset().left + c.outerWidth() ? (j = parseInt(oa.find("a").css("width"), 10), oa.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), oa.css("left", h + c.offset().left + c.outerWidth() - b.win.pageXOffset - j / 2), oa.data("selected-cell", c), oa.data("position", "after"), oa.addClass("fr-visible"), !1) : void 0
            })
        }

        function Z(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            oa || ha(), b.$box.append(oa), oa.data("instance", b);
            var e = a(d),
                f = c.pageY,
                g = 0,
                h = 0;
            b.opts.iframe && (g += b.$iframe.offset().left - a(b.o_win).scrollLeft(), h += b.$iframe.offset().top - a(b.o_win).scrollTop());
            var i;
            e.find("tr").each(function() {
                var c = a(this);
                return c.offset().top <= f && f < c.offset().top + c.outerHeight() / 2 ? (i = parseInt(oa.find("a").css("width"), 10), oa.css("top", h + c.offset().top - b.win.pageYOffset - i / 2), oa.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), oa.data("selected-cell", c.find("td:first")), oa.data("position", "above"), oa.addClass("fr-visible"), !1) : c.offset().top + c.outerHeight() / 2 <= f && f < c.offset().top + c.outerHeight() ? (i = parseInt(oa.find("a").css("width"), 10), oa.css("top", h + c.offset().top + c.outerHeight() - b.win.pageYOffset - i / 2), oa.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), oa.data("selected-cell", c.find("td:first")), oa.data("position", "below"), oa.addClass("fr-visible"), !1) : void 0
            })
        }

        function $(c, d) {
            if (0 === ka().length) {
                var e, f, g;
                if (d && ("HTML" == d.tagName || "BODY" == d.tagName || b.node.isElement(d)))
                    for (e = 1; e <= b.opts.tableInsertHelperOffset; e++) {
                        if (f = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset, c.pageY - b.win.pageYOffset + e), a(f).hasClass("fr-tooltip")) return !0;
                        if (f && ("TH" == f.tagName || "TD" == f.tagName || "TABLE" == f.tagName) && (a(f).parents(".fr-wrapper").length || b.opts.iframe)) return Y(c, f.closest("table")), !0;
                        if (g = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset + e, c.pageY - b.win.pageYOffset), a(g).hasClass("fr-tooltip")) return !0;
                        if (g && ("TH" == g.tagName || "TD" == g.tagName || "TABLE" == g.tagName) && (a(g).parents(".fr-wrapper").length || b.opts.iframe)) return Z(c, g.closest("table")), !0
                    }
                b.core.sameInstance(oa) && W()
            }
        }

        function _(a) {
            sa = null;
            var c = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            b.opts.tableResizer && (!b.popups.areVisible() || b.popups.areVisible() && b.popups.isVisible("table.edit")) && X(a, c), !b.opts.tableInsertHelper || b.popups.areVisible() || b.$tb.hasClass("fr-inline") && b.$tb.is(":visible") || $(a, c)
        }

        function aa() {
            if (ta) {
                var c = na.data("table"),
                    d = c.offset().top - b.win.pageYOffset;
                b.opts.iframe && (d += b.$iframe.offset().top - a(b.o_win).scrollTop()), na.css("top", d)
            }
        }

        function ba() {
            var c = na.data("origin"),
                d = na.data("release-position");
            if (c !== d) {
                var e = na.data("first"),
                    f = na.data("second"),
                    g = na.data("table"),
                    h = g.outerWidth();
                if (null !== e && null !== f) {
                    var i, j, k, l = F(g),
                        m = [],
                        n = [],
                        o = [],
                        p = [];
                    for (i = 0; i < l.length; i++) j = a(l[i][e]), k = a(l[i][f]), m[i] = j.outerWidth(), o[i] = k.outerWidth(), n[i] = m[i] / h * 100, p[i] = o[i] / h * 100;
                    for (i = 0; i < l.length; i++) {
                        j = a(l[i][e]), k = a(l[i][f]);
                        var q = (n[i] * (m[i] + d - c) / m[i]).toFixed(4);
                        j.css("width", q + "%"), k.css("width", (n[i] + p[i] - q).toFixed(4) + "%")
                    }
                } else {
                    var r, s = g.parent(),
                        t = h / s.width() * 100;
                    r = null == e ? (h - d + c) / h * t : (h + d - c) / h * t, g.css("width", Math.round(r).toFixed(4) + "%")
                }
            }
            na.removeData("origin"), na.removeData("release-position"), na.removeData("first"), na.removeData("second"), na.removeData("table"), b.undo.saveStep()
        }

        function ca(b, c) {
            var d, e = a(c[0][b]).outerWidth();
            for (d = 1; d < c.length; d++) e = Math.min(e, a(c[d][b]).outerWidth());
            return e
        }

        function da(a, b, c) {
            var d, e = 0;
            for (d = a; b >= d; d++) e += ca(d, c);
            return e
        }

        function ea(a) {
            if (ka().length > 1 && qa && J(), qa === !1 && pa === !1 && ta === !1) sa && clearTimeout(sa), (!b.edit.isDisabled() || b.popups.isVisible("table.edit")) && (sa = setTimeout(_, 30, a));
            else if (ta) {
                var c = a.pageX - b.win.pageXOffset;
                b.opts.iframe && (c += b.$iframe.offset().left);
                var d = na.data("max-left"),
                    e = na.data("max-right");
                c >= d && e >= c ? na.css("left", c - b.opts.tableResizerOffset) : d > c && parseFloat(na.css("left"), 10) > d - b.opts.tableResizerOffset ? na.css("left", d - b.opts.tableResizerOffset) : c > e && parseFloat(na.css("left"), 10) < e - b.opts.tableResizerOffset && na.css("left", e - b.opts.tableResizerOffset)
            } else qa && W()
        }

        function fa(c) {
            b.node.isEmpty(c.get(0)) ? c.prepend(a.FE.MARKERS) : c.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER)
        }

        function ga(c) {
            var d = c.which;
            if (d == a.FE.KEYCODE.TAB && 0 === b.opts.tabSpaces) {
                var e;
                if (ka().length > 0) e = b.$el.find(".fr-selected-cell:last");
                else {
                    var f = b.selection.element();
                    "TD" == f.tagName || "TH" == f.tagName ? e = a(f) : a(f).closest("td").length > 0 ? e = a(f).closest("td") : a(f).closest("th").length > 0 && (e = a(f).closest("th"))
                }
                e && (c.preventDefault(), P(), c.shiftKey ? e.prev().length > 0 ? fa(e.prev()) : e.closest("tr").length > 0 && e.closest("tr").prev().length > 0 ? fa(e.closest("tr").prev().find("td:last")) : e.closest("tbody").length > 0 && e.closest("table").find("thead tr").length > 0 && fa(e.closest("table").find("thead tr th:last")) : e.next().length > 0 ? fa(e.next()) : e.closest("tr").length > 0 && e.closest("tr").next().length > 0 ? fa(e.closest("tr").next().find("td:first")) : e.closest("thead").length > 0 && e.closest("table").find("tbody tr").length > 0 ? fa(e.closest("table").find("tbody tr td:first")) : (e.addClass("fr-selected-cell"), q("below"), I(), fa(e.closest("tr").next().find("td:first"))), b.selection.restore())
            }
        }

        function ha() {
            b.shared.$ti_helper || (b.shared.$ti_helper = a('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabindex="-1" title="' + b.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), b.events.bindClick(b.shared.$ti_helper, "a", function() {
                var a = oa.data("selected-cell"),
                    c = oa.data("position"),
                    d = oa.data("instance") || b;
                "before" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "after" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "above" == c ? (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")) : "below" == c && (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")), W()
            }), b.events.on("shared.destroy", function() {
                b.shared.$ti_helper.html("").removeData().remove(), b.shared.$ti_helper = null
            }, !0), b.events.$on(b.shared.$ti_helper, "mousemove", function(a) {
                a.stopPropagation()
            }, !0), b.events.$on(a(b.o_win), "scroll", function() {
                W()
            }, !0), b.events.$on(b.$wp, "scroll", function() {
                W()
            }, !0)), oa = b.shared.$ti_helper, b.events.on("destroy", function() {
                oa = null
            }), b.tooltip.bind(b.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function ia() {
            ra = null, clearTimeout(sa)
        }

        function ja() {
            ka().length > 0 ? d() : (b.popups.hide("table.insert"), b.toolbar.showInline())
        }

        function ka() {
            return b.$el.get(0).querySelectorAll(".fr-selected-cell")
        }

        function la() {
            var c = ka();
            if (c.length) {
                for (var d = c[0]; d && "TABLE" != d.tagName && d.parentNode != b.$el.get(0);) d = d.parentNode;
                return a(d && "TABLE" == d.tagName ? d : [])
            }
            return a([])
        }

        function ma() {
            if (!b.$wp) return !1;
            if (!b.helpers.isMobile()) {
                qa = !1, pa = !1, ta = !1, b.events.$on(b.$el, "mousedown", Q), b.popups.onShow("image.edit", function() {
                    I(), qa = !1, pa = !1
                }), b.popups.onShow("link.edit", function() {
                    I(), qa = !1, pa = !1
                }), b.events.on("commands.mousedown", function(a) {
                    a.parents(".fr-toolbar").length > 0 && I()
                }), b.events.$on(b.$el, "mouseenter", "th, td", S), b.events.$on(b.$win, "mouseup", R), b.opts.iframe && b.events.$on(a(b.o_win), "mouseup", R), b.events.$on(b.$el, "keydown", T), b.events.$on(b.$win, "mousemove", ea), b.events.$on(a(b.o_win), "scroll", aa), b.events.on("contentChanged", function() {
                    ka().length > 0 && (d(), b.$el.find("img").on("load.selected-cells", function() {
                        a(this).off("load.selected-cells"), ka().length > 0 && d()
                    }))
                }), b.events.$on(a(b.o_win), "resize", function() {
                    I()
                }), b.events.on("keydown", function(c) {
                    var d = ka();
                    if (d.length > 0) {
                        if (c.which == a.FE.KEYCODE.ESC && b.popups.isVisible("table.edit")) return I(), b.popups.hide("table.edit"), c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation(), d = [], !1;
                        if (d.length > 1 && c.which == a.FE.KEYCODE.BACKSPACE) {
                            b.undo.saveStep();
                            for (var e = 0; e < d.length; e++) a(d[e]).html("<br>"), e == d.length - 1 && a(d[e]).prepend(a.FE.MARKERS);
                            return b.selection.restore(), b.undo.saveStep(), d = [], !1
                        }
                        if (d.length > 1 && !b.keys.ctrlKey(c)) return c.preventDefault(), d = [], !1
                    }
                    d = []
                }, !0);
                var c = [];
                b.events.on("html.beforeGet", function() {
                    c = ka();
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className || "").replace(/fr-selected-cell/g, "")
                }), b.events.on("html.get", function(a) {
                    return a = a.replace(/<(td|th)((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/(td|th)>/g, "<$1$2$3>$4</$5>")
                }), b.events.on("html.afterGet", function() {
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className ? c[a].className + " " : "") + "fr-selected-cell";
                    c = []
                }), g(!0), i(!0)
            }
            b.events.on("keydown", ga, !0), b.events.on("destroy", ia)
        }
        var na, oa, pa, qa, ra, sa, ta;
        return {
            _init: ma,
            insert: m,
            remove: n,
            insertRow: q,
            deleteRow: r,
            insertColumn: s,
            deleteColumn: t,
            mergeCells: y,
            splitCellVertically: A,
            splitCellHorizontally: z,
            addHeader: o,
            removeHeader: p,
            setBackground: B,
            showInsertPopup: c,
            showEditPopup: d,
            showColorsPopup: e,
            back: ja,
            verticalAlign: C,
            horizontalAlign: D,
            applyStyle: E,
            selectedTable: la,
            selectedCells: ka
        }
    }, a.FE.DefineIcon("insertTable", {
        NAME: "table"
    }), a.FE.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(),
                this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }), a.FE.RegisterCommand("tableInsert", {
        callback: function(a, b, c) {
            this.table.insert(b, c), this.popups.hide("table.insert")
        }
    }), a.FE.DefineIcon("tableHeader", {
        NAME: "header"
    }), a.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        callback: function() {
            var a = this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]');
            a.hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
        },
        refresh: function(a) {
            var b = this.table.selectedTable();
            b.length > 0 && (0 === b.find("th").length ? a.removeClass("fr-active") : a.addClass("fr-active"))
        }
    }), a.FE.DefineIcon("tableRows", {
        NAME: "bars"
    }), a.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: {
            above: "Insert row above",
            below: "Insert row below",
            "delete": "Delete row"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list">',
                c = a.FE.COMMANDS.tableRows.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command" data-cmd="tableRows" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "above" == b || "below" == b ? this.table.insertRow(b) : this.table.deleteRow()
        }
    }), a.FE.DefineIcon("tableColumns", {
        NAME: "bars fa-rotate-90"
    }), a.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: {
            before: "Insert column before",
            after: "Insert column after",
            "delete": "Delete column"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list">',
                c = a.FE.COMMANDS.tableColumns.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command" data-cmd="tableColumns" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "before" == b || "after" == b ? this.table.insertColumn(b) : this.table.deleteColumn()
        }
    }), a.FE.DefineIcon("tableCells", {
        NAME: "square-o"
    }), a.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: {
            merge: "Merge cells",
            "vertical-split": "Vertical split",
            "horizontal-split": "Horizontal split"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list">',
                c = a.FE.COMMANDS.tableCells.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command" data-cmd="tableCells" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "merge" == b ? this.table.mergeCells() : "vertical-split" == b ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
        },
        refreshOnShow: function(a, b) {
            this.$el.find(".fr-selected-cell").length > 1 ? (b.find('a[data-param1="vertical-split"]').addClass("fr-disabled"), b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled"), b.find('a[data-param1="merge"]').removeClass("fr-disabled")) : (b.find('a[data-param1="merge"]').addClass("fr-disabled"), b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled"), b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled"))
        }
    }), a.FE.DefineIcon("tableRemove", {
        NAME: "trash"
    }), a.FE.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function() {
            this.table.remove()
        }
    }), a.FE.DefineIcon("tableStyle", {
        NAME: "paint-brush"
    }), a.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var a = '<ul class="fr-dropdown-list">',
                b = this.opts.tableStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li><a class="fr-command" data-cmd="tableStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function(b, c) {
            var d = this.$el.find(".fr-selected-cell").closest("table");
            d && c.find(".fr-command").each(function() {
                var b = a(this).data("param1");
                a(this).toggleClass("fr-active", d.hasClass(b))
            })
        }
    }), a.FE.DefineIcon("tableCellBackground", {
        NAME: "tint"
    }), a.FE.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        callback: function() {
            this.table.showColorsPopup()
        }
    }), a.FE.RegisterCommand("tableCellBackgroundColor", {
        undo: !0,
        focus: !1,
        callback: function(a, b) {
            this.table.setBackground(b)
        }
    }), a.FE.DefineIcon("tableBack", {
        NAME: "arrow-left"
    }), a.FE.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.table.back()
        },
        refresh: function(a) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    }), a.FE.DefineIcon("tableCellVerticalAlign", {
        NAME: "arrows-v"
    }), a.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: {
            Top: "Align Top",
            Middle: "Align Middle",
            Bottom: "Align Bottom"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list">',
                c = a.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command" data-cmd="tableCellVerticalAlign" data-param1="' + d.toLowerCase() + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(d) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            this.table.verticalAlign(b)
        },
        refreshOnShow: function(a, b) {
            b.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active")
        }
    }), a.FE.DefineIcon("tableCellHorizontalAlign", {
        NAME: "align-left"
    }), a.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), a.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), a.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), a.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), a.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list">',
                c = a.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command fr-title" data-cmd="tableCellHorizontalAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            this.table.horizontalAlign(b)
        },
        refresh: function(b) {
            var c = this.table.selectedCells();
            c.length && b.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(a(c[0]))))
        },
        refreshOnShow: function(a, b) {
            b.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active")
        }
    }), a.FE.DefineIcon("tableCellStyle", {
        NAME: "magic"
    }), a.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var a = '<ul class="fr-dropdown-list">',
                b = this.opts.tableCellStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li><a class="fr-command" data-cmd="tableCellStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function(b, c) {
            var d = this.$el.find(".fr-selected-cell:first");
            d && c.find(".fr-command").each(function() {
                var b = a(this).data("param1");
                a(this).toggleClass("fr-active", d.hasClass(b))
            })
        }
    })
});