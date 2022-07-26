<template>
  <div class="container">
    <div class="pro_title">▎世界各大洲现存确诊占比图</div>
    <ul>
      <li>
        <strong style="color: rgb(247, 76, 49)">4,702,385</strong>
        <span>现存确诊</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(247, 76, 49)">+17,624</em></b>
        </div>
      </li>

      <li>
        <strong style="color: rgb(247, 76, 49)">20,459</strong>
        <span>境外输入</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(247, 130, 7)">+50</em></b>
        </div>
      </li>

      <li>
        <strong style="color: rgb(162, 90, 78)">6,972</strong>
        <span>现存无症状</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(162, 90, 78)">+499</em></b>
        </div>
      </li>

      <li>
        <strong style="color: rgb(174, 33, 44)">5,028,631</strong>
        <span>累计确诊</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(174, 33, 44)">+17,965</em></b>
        </div>
      </li>
      <li>
        <strong style="color: rgb(40, 183, 163)">302,893</strong>
        <span>累计治愈</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(40, 183, 163)">+285</em></b>
        </div>
      </li>
      <li>
        <strong style="color: ">23,353</strong>
        <span>累计死亡</span>
        <div class="createCount">
          <b>较昨日<em style="color: rgb(93, 112, 146)">+56</em></b>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 30%;
  > div {
    // position: absolute;
    width: 100%;
    height: 8%;
    margin-bottom: 6px;
  }
  ul {
    display: flex;
    width: 100%;
    height: 94%;
    // justify-items: ;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.3%;
      height: 45%;
      padding-top: 10px;
    }
    .createCount {
      margin-top: 15px;
      b em {
        margin-left: 6px;
      }
    }
  }
}

li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
