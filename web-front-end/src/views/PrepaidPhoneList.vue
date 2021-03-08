<template>
  <div class="pd20">
    <div class="mgb10">
      <el-button @click="dialog.exp = true" type="primary" plain>导出</el-button>
      <el-button @click="dialog.stat = true" type="warning" plain>统计信息</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      :height="tableHeight"
      :data="tableData">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="voteTime"
        label="参与活动时间"
        width="170"
        align="center">
        <template slot-scope="scope">
          {{new Date(scope.row.voteTime).Format('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        align="center"
        width="150"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="winningAmount"
        align="center"
        width="120"
        label="中奖话费金额">
      </el-table-column>
      <el-table-column
        prop="voteInfo"
        align="center"
        width="100"
        label="投票作品数">
        <template slot-scope="scope">
          <span>{{JSON.parse(scope.row.voteInfo).length}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="recharge"
        width="120"
        align="center"
        label=是否充值>
        <template slot-scope="scope">
          <span :class="scope.row.recharge ? 'text--success' : 'text--error'">
            {{scope.row.recharge ? '是' : '否'}}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableParams.currentPage"
        :page-sizes="[30, 50, 70, 100]"
        :page-size="tableParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="导出"
      :visible.sync="dialog.exp"
      width="300px"
      :before-close="handleClose">
      <div>
        <p>将充值列表导出为excel，请选择需要导出的序号范围：</p>
        <el-row class="mgt10">
          <el-col :span="11">
            <el-input type="text"></el-input>
          </el-col>
          <el-col class="tc" :span="2">-</el-col>
          <el-col :span="11">
            <el-input type="text"></el-input>
          </el-col>
        </el-row>
      </div>
      <p slot="footer" class="dialog-footer">
        <el-button @click="dialog.exp = false">取 消</el-button>
        <el-button type="primary" @click="handleExp">确 定</el-button>
      </p>
    </el-dialog>

    <el-dialog
      title="统计信息"
      :visible.sync="dialog.stat"
      width="320px"
      :before-close="handleClose">
      <div>
        <p class="info-item">
          <span class="info-item-name">中奖用户数量</span>
          <span class="info-item-count">500</span>
        </p>
        <p class="info-item">
          <span class="info-item-name">中奖10元话费数量</span>
          <span class="info-item-count">200</span>
        </p>
        <p class="info-item">
          <span class="info-item-name">中奖5元话费数量</span>
          <span class="info-item-count">300</span>
        </p>
      </div>
      <p slot="footer" class="dialog-footer">
        <el-button @click="dialog.stat = false">取 消</el-button>
        <el-button type="warning" @click="handleStat">确 定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PrepaidPhoneList',
    data() {
      return {
        tableLoading: false,
        tableHeight: 300,
        tableParams: {
          pageSize: 30,
          currentPage: 1,
          orderBy: 'DESC',
          orderField: 'voteTime'
        },
        total: 0,
        dialog: {
          exp: false,
          stat: false
        },
        form: {

        },
        tableData: []
      }
    },
    methods: {
      handleChangeType(type) {
        this.tableParams.entriesType = type;
        this.tableParams.currentPage = 1;
        this.getData();
      },
      handleSizeChange(pageSize) {
        this.tableParams.pageSize = pageSize;
        this.getData();
      },
      handleCurrentChange(currentPage) {
        this.tableParams.currentPage = currentPage;
        this.getData();
      },
      handleExp() {
        this.dialog.exp = false;
      },
      handleStat() {
        this.dialog.stat = false;
      },
      handleClose() {},
      getData() {
        this.tableLoading = true;
        this.$utils.getJson('/winning/query', res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.tableLoading = false;
        }, () => this.tableLoading = false, this.tableParams, 'GET');
      },
      setTableHeight() {
        this.tableHeight = this.$utils.getTableMaxHeight(['.pagination'], 0, '.el-main');
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      window.onresize = () => this.setTableHeight();
    },
    updated() {
      this.setTableHeight();
    }
  }
</script>
