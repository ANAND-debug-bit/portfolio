#!/usr/bin/env python3
"""Generate SkyGuard AI Hackathon Plan PDF from markdown source."""

from pathlib import Path
import re
from fpdf import FPDF


MD_PATH = Path(__file__).parent / "SkyGuard-AI-Hackathon-Plan.md"
PDF_PATH = Path(__file__).parent / "SkyGuard-AI-Hackathon-Plan.pdf"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"


class PlanPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("ArialUni", "", FONT_REGULAR)
        self.add_font("ArialUni", "B", FONT_BOLD)
        self.add_font("ArialUni", "I", FONT_ITALIC)

    def header(self):
        if self.page_no() > 1:
            self.set_font("ArialUni", "I", 8)
            self.set_text_color(120, 120, 120)
            self.cell(0, 8, "SkyGuard AI — Hackathon Execution Plan", align="C", new_x="LMARGIN", new_y="NEXT")

    def footer(self):
        self.set_y(-12)
        self.set_font("ArialUni", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 8, f"Page {self.page_no()}", align="C")


def strip_md_inline(text: str) -> str:
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    text = re.sub(r"`(.+?)`", r"\1", text)
    text = re.sub(r"\[(.+?)\]\(.+?\)", r"\1", text)
    return text.strip()


def is_table_row(line: str) -> bool:
    s = line.strip()
    return s.startswith("|") and s.endswith("|") and "|" in s[1:-1]


def is_separator_row(line: str) -> bool:
    s = line.strip().strip("|").replace(" ", "")
    return bool(s) and set(s) <= {"-", "|", ":"}


def parse_table_row(line: str) -> list[str]:
    return [strip_md_inline(c.strip()) for c in line.strip().strip("|").split("|")]


def ensure_space(pdf: PlanPDF, height: float = 20) -> None:
    if pdf.get_y() + height > pdf.h - pdf.b_margin:
        pdf.add_page()


def render_table(pdf: PlanPDF, rows: list[list[str]]) -> None:
    if not rows:
        return

    col_count = max(len(r) for r in rows)
    rows = [r + [""] * (col_count - len(r)) for r in rows]
    page_width = pdf.w - pdf.l_margin - pdf.r_margin
    col_width = page_width / col_count

    for row_idx, row in enumerate(rows):
        ensure_space(pdf, 10)
        pdf.set_x(pdf.l_margin)
        is_header = row_idx == 0
        pdf.set_font("ArialUni", "B" if is_header else "", 7.5 if not is_header else 8)
        if is_header:
            pdf.set_fill_color(240, 244, 248)
        else:
            pdf.set_fill_color(255, 255, 255)

        line = " | ".join(cell[:50] for cell in row)
        pdf.multi_cell(page_width, 5, line, border=1, fill=is_header, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(2)


def write_paragraph(pdf: PlanPDF, text: str, size: float = 10, bold: bool = False) -> None:
    text = strip_md_inline(text)
    if not text:
        return
    ensure_space(pdf, 10)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("ArialUni", "B" if bold else "", size)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(0, 5.5, text, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)


def write_code_block(pdf: PlanPDF, lines: list[str]) -> None:
    ensure_space(pdf, 20)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("ArialUni", "", 8)
    pdf.set_fill_color(245, 245, 245)
    pdf.set_text_color(20, 20, 20)
    pdf.multi_cell(0, 4.5, "\n".join(lines), fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)


def build_pdf(md_text: str) -> PlanPDF:
    pdf = PlanPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_margins(15, 15, 15)

    lines = md_text.splitlines()
    i = 0
    in_code = False
    code_buf: list[str] = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if in_code:
            if stripped.startswith("```"):
                write_code_block(pdf, code_buf)
                code_buf = []
                in_code = False
            else:
                code_buf.append(line)
            i += 1
            continue

        if is_table_row(line):
            table_buf = [line]
            i += 1
            while i < len(lines) and is_table_row(lines[i]):
                table_buf.append(lines[i])
                i += 1
            parsed = [parse_table_row(r) for r in table_buf if not is_separator_row(r)]
            render_table(pdf, parsed)
            continue

        if stripped.startswith("```"):
            in_code = True
            i += 1
            continue

        if stripped == "---":
            pdf.ln(2)
            pdf.set_draw_color(200, 200, 200)
            y = pdf.get_y()
            pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
            pdf.ln(4)
            i += 1
            continue

        if stripped.startswith("# "):
            pdf.ln(4)
            ensure_space(pdf, 20)
            pdf.set_x(pdf.l_margin)
            pdf.set_font("ArialUni", "B", 18)
            pdf.set_text_color(15, 60, 110)
            pdf.multi_cell(0, 10, strip_md_inline(stripped[2:]), new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
            i += 1
            continue

        if stripped.startswith("## "):
            ensure_space(pdf, 15)
            pdf.ln(3)
            pdf.set_x(pdf.l_margin)
            pdf.set_font("ArialUni", "B", 14)
            pdf.set_text_color(25, 80, 130)
            pdf.multi_cell(0, 8, strip_md_inline(stripped[3:]), new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
            i += 1
            continue

        if stripped.startswith("### "):
            ensure_space(pdf, 12)
            pdf.ln(2)
            pdf.set_x(pdf.l_margin)
            pdf.set_font("ArialUni", "B", 11)
            pdf.set_text_color(40, 40, 40)
            pdf.multi_cell(0, 7, strip_md_inline(stripped[4:]), new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
            i += 1
            continue

        if stripped.startswith("- ") or stripped.startswith("□ "):
            ensure_space(pdf, 8)
            pdf.set_x(pdf.l_margin)
            pdf.set_font("ArialUni", "", 9.5)
            pdf.set_text_color(30, 30, 30)
            bullet = "•" if stripped.startswith("- ") else "[ ]"
            content = stripped[2:] if stripped.startswith("- ") else stripped
            pdf.multi_cell(0, 5.5, f"  {bullet}  {strip_md_inline(content)}", new_x="LMARGIN", new_y="NEXT")
            i += 1
            continue

        if re.match(r"^\d+\.\s", stripped):
            write_paragraph(pdf, stripped, size=9.5)
            i += 1
            continue

        if stripped:
            write_paragraph(pdf, stripped, size=9.5)
        else:
            pdf.ln(2)
        i += 1

    return pdf


def main():
    md_text = MD_PATH.read_text(encoding="utf-8")
    pdf = build_pdf(md_text)
    pdf.output(str(PDF_PATH))
    print(f"PDF created: {PDF_PATH}")
    print(f"Size: {PDF_PATH.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
