"""Rebuild the two patient-education charts (optional: Python + matplotlib).

This is not part of the website's dependency-free Node build. The committed PNGs
are served directly. Original chart artwork: CC BY 4.0; numerical sources below.
"""
from pathlib import Path
import json
import matplotlib
matplotlib.use("Agg")
from matplotlib import pyplot as plt, font_manager
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
font_path = Path("C:/Windows/Fonts/malgun.ttf")
if font_path.exists():
    font_manager.fontManager.addfont(str(font_path))
    font_name = font_manager.FontProperties(fname=str(font_path)).get_name()
else:
    font_name = "Noto Sans CJK KR"
plt.rcParams.update({"font.family": font_name, "font.size": 16,
                     "axes.unicode_minus": False, "savefig.dpi": 220})
PAPER, INK, GREEN, SAGE = "#f6f7f0", "#315e49", "#397966", "#aabd9d"

def frame(title, ylabel, ymax, ticks):
    fig, ax = plt.subplots(figsize=(12, 6.4), facecolor=PAPER)
    ax.set_facecolor(PAPER)
    fig.text(.12, .94, title, fontsize=23, fontweight="bold", color=INK)
    ax.set_ylabel(ylabel, color=INK, fontsize=15, labelpad=12)
    ax.set_ylim(0, ymax)
    ax.set_yticks(ticks)
    ax.tick_params(colors="#667a69", length=0, pad=12)
    ax.grid(axis="y", color="#d9e1d3", zorder=0)
    for side in ax.spines.values():
        side.set_visible(False)
    fig.subplots_adjust(left=.12, right=.97, top=.79, bottom=.21)
    return fig, ax

fig, ax = frame("치료 시작 연령별 시력 개선 반응", "24주 이내 2줄 이상 개선 비율 (%)", 100, [0,25,50,75,100])
x = np.arange(2)
for shift, values, color, label in [(-.18, [53,25], GREEN, "안경 + 적극치료"),(.18,[25,23],SAGE,"안경교정만")]:
    bars=ax.bar(x+shift, values, .32, color=color, label=label, zorder=3)
    ax.bar_label(bars, labels=[f"{v}%" for v in values], padding=7, color=INK, fontsize=20, fontweight="bold")
ax.set_xticks(x, ["7–12세", "13–17세"], fontsize=19)
ax.legend(loc="upper left", bbox_to_anchor=(0,1.12), ncol=2, frameon=False, fontsize=14)
fig.text(.12,.07,"PEDIG 2005 · 완치율이 아닌 개선 반응률 · 연령군별 치료 구성·과거 치료 경험이 다름", fontsize=12, color="#657c69")
fig.savefig(ROOT/"dist/images/education-amblyopia-response.png")
plt.close(fig)

# Holmes et al. 2011, Table 3: adjusted mean improvement and 95% confidence intervals.
ages=["3세~5세 미만", "5세~7세 미만", "7세~13세 미만"]
moderate=[2.29,2.41,1.65]; severe=[4.16,3.60,1.99]
fig, ax=frame("어린 연령에서의 평균 시력 개선량", "추가 치료 후 평균 시력 개선 (줄)", 5, [0,1,2,3,4,5])
x=np.arange(3)
for shift, values, lower, upper, color, label in [
    (-.18,moderate,[2.00,2.17,1.31],[2.57,2.65,1.99],GREEN,"중등도 약시"),
    (.18,severe,[3.75,3.17,1.41],[4.58,4.02,2.57],SAGE,"심한 약시")]:
    err=[np.array(values)-lower,np.array(upper)-values]
    bars=ax.bar(x+shift,values,.32,color=color,label=label,zorder=3)
    ax.errorbar(x+shift,values,yerr=err,fmt="none",ecolor="#637b65",capsize=5,zorder=4)
    for xx,v,hi in zip(x+shift,values,upper):
        ax.text(xx,hi+.08,f"{v:.2f}",ha="center",fontsize=16,fontweight="bold",color=INK)
ax.set_xticks(x,ages,fontsize=16)
ax.legend(loc="upper left",bbox_to_anchor=(0,1.12),ncol=2,frameon=False,fontsize=14)
fig.text(.12,.07,"Holmes/PEDIG 2011 · 4개 시험 996명 · 17–24주 보정 평균 · 오차막대: 95% 신뢰구간",fontsize=12,color="#657c69")
fig.savefig(ROOT/"dist/images/education-amblyopia-younger.png")
plt.close(fig)

base={"author":"eye-guide · 자체 제작 그래프", "license":"CC BY 4.0", "licenseUrl":"https://creativecommons.org/licenses/by/4.0/",
      "width":2640,"height":1408,"kind":"diagram","checked":"2026-10-29",
      "changes":"논문이 보고한 수치를 이용해 Matplotlib으로 새로 작성한 그래프. 논문 그림을 복제하거나 편집하지 않았습니다."}
records=[]
for key,title,caption,url,data in [
    ("response","치료 시작 연령별 시력 개선 반응",
     "7–12세는 안경+적극치료 53%, 안경교정만 25%, 13–17세는 25%와 23%였습니다. 24주 이내 시력 2줄 이상 개선을 반응으로 정의한 연구 결과이며 완치율은 아닙니다. 적극치료는 가림+근거리 활동이고 7–12세는 아트로핀도 포함했습니다. 치료 구성과 과거 치료 경험이 달라 나이만의 효과로 비교하지 않습니다. 13–17세 미치료 하위군은 47%와 20%로, 나이만으로 치료를 포기하지 않습니다.",
     "https://public.jaeb.org/pedig/stdy/1",{"ageGroups":["7–12","13–17"],"active":[53,25],"optical":[25,23],"endpoint":"2 lines or more by 24 weeks","PMID":"15824215"}),
    ("younger","어린 연령에서의 평균 시력 개선량",
     "3세~5세 미만, 5세~7세 미만, 7세~13세 미만의 평균 시력 개선량을 약시 정도별로 비교했습니다. 이는 성공률(%)이 아닌 17–24주 보정 평균 개선량(줄)입니다. 안경 적응 후 추가 치료 반응을 분석한 4개 시험의 통합 자료이며, 시작 시력·치료·검사법 등의 차이를 고려해야 합니다. 같은 줄 수 개선도 정상 시력 도달이나 완치를 뜻하지 않습니다.",
     "https://pmc.ncbi.nlm.nih.gov/articles/PMC3217111/",{"ageGroups":["3–<5","5–<7","7–<13"],"moderate":moderate,"severe":severe,"PMID":"21746970","table":"3","endpoint":"adjusted mean logMAR lines improvement, 17–24 weeks"})]:
    name=f"education-amblyopia-{key}"
    published=f"https://raw.githubusercontent.com/cucube1985/eye-guide/main/dist/images/{name}.png"
    records.append({**base,"id":name,"src":f"./images/{name}.png","title":title,"originalTitle":title+" — eye-guide original chart",
                    "alt":title+" — "+caption,"caption":caption,"sourceUrl":url,"originalUrl":published,"downloadUrl":published,
                    "metadataEvidence":{"creation":"Original Matplotlib chart from reported numerical data; no published artwork copied.","data":data,"code":"scripts/create-education-charts.py"}})
(ROOT/"content/images/educational-charts.json").write_text(json.dumps(records,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Created 2 original clinical evidence charts.")
