<template>
  <div class="pd20">
    <div class="mgb10">
      <el-button @click="dialog.add = true" type="primary" plain>新增</el-button>
      <el-button @click="handleStatDialogShow" type="warning" plain>统计信息</el-button>
      <el-dropdown class="mgl10" trigger="click"  @command="handleChangeType">
        <el-button type="primary">
          参赛类别：<span style="color: #2a17ccf5;">{{tableParams.entriesType}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in typeList" :command="item" :key="item">
            {{item}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table
      v-loading="tableLoading"
      :height="tableHeight"
      :data="tableData">
      <el-table-column
        prop="rank"
        width="110"
        align="center"
        label="喜爱度排名">
      </el-table-column>
      <el-table-column
        prop="numberVotes"
        width="100"
        align="center"
        label="投票数">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="entriesType"
        label="参赛类别"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="entriesName"
        align="center"
        label="参赛作品名称">
      </el-table-column>
      <el-table-column
        prop="enterpriseName"
        align="center"
        label="商家名称">
      </el-table-column>
      <el-table-column
        prop="enterpriseAddress"
        align="center"
        label="商家地址">
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="dialog.edit = true" v-if="false"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelDialogShow(scope.row.id)"></el-button>
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
      title="删除"
      :visible.sync="dialog.del"
      width="300px">
      <div v-loading="dialogLoading">
        <span>确定要删除所选参赛作品吗？</span>
        <p class="tr mgt15 mgb10">
          <el-button @click="dialog.del = false">取 消</el-button>
          <el-button type="danger" @click="handleDel">确 定</el-button>
        </p>
      </div>
    </el-dialog>

    <el-dialog
      title="添加参赛作品"
      :visible.sync="dialog.add"
      width="450px"
      @closed="handleClose('form')">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        v-loading="dialogLoading">
        <el-form-item label="名称" required prop="entriesName">
          <el-input type="text" v-model="form.entriesName"></el-input>
        </el-form-item>
        <el-form-item label="参赛类别" required prop="entriesType">
          <el-select v-model="form.entriesType" placeholder="请选择参赛类别">
            <el-option
              v-for="item of typeList2"
              :label="item"
              :value="item"
              :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家名称" required prop="enterpriseName">
          <el-input type="text" v-model="form.enterpriseName"></el-input>
        </el-form-item>
        <el-form-item label="商家地址" required prop="enterpriseAddress">
          <el-input type="text" v-model="form.enterpriseAddress"></el-input>
        </el-form-item>
        <el-form-item label="参赛图片" required prop="fileName">
          <el-input type="text" v-model="form.fileName"></el-input>
          <input type="file" class="el-dialog-file" @change="changeFile" id="file" accept="image/*">
        </el-form-item>
        <el-form-item class="tr">
          <el-button @click="dialog.add = false">取消</el-button>
          <el-button type="primary" @click="handleAdd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="统计信息"
      :visible.sync="dialog.stat"
      width="320px">
      <div v-loading="dialogLoading">
        <div>
          <p class="info-item">
            <span class="info-item-name">参赛类别</span>
            <span class="info-item-count">{{stat.typeCount || 0}}</span>
          </p>
          <p class="info-item">
            <span class="info-item-name">参赛作品数量</span>
            <span class="info-item-count">{{stat.entriesCount || 0}}</span>
          </p>
          <p class="info-item">
            <span class="info-item-name">商家数</span>
            <span class="info-item-count">{{stat.enterpriseCount || 0}}</span>
          </p>
          <p class="info-item">
            <span class="info-item-name">参与评选人数</span>
            <span class="info-item-count">{{stat.voteCount || 0}}</span>
          </p>
        </div>
        <p class="tr mgt15 mgb10">
          <el-button @click="dialog.stat = false">取 消</el-button>
          <el-button type="warning" @click="dialog.stat = false">确 定</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  data() {
    return {
      dialogLoading: false,
      tableLoading: false,
      tableHeight: 300,
      tableParams: {
        pageSize: 30,
        currentPage: 1,
        orderBy: 'DESC',
        orderField: 'numberVotes',
        entriesType: '全部'
      },
      total: 0,
      dialog: {
        add: false,
        edit: false,
        del: false,
        exp: false,
        stat: false
      },
      typeList: ['全部', '名小吃', '名菜', '名店', '特色火锅', '利州风味宴', '网红餐饮店'],
      typeList2: ['名小吃', '名菜', '名店', '特色火锅', '利州风味宴', '网红餐饮店'],
      form: {
        enterpriseAddress: '',
        enterpriseName: '',
        entriesName: '',
        entriesType: '',
        fileName: ''
      },
      stat: {},
      rules: {
        entriesName: [{required: true, message: '请输入参赛作品名称'}],
        entriesType: [{required: true, message: '请选择参赛类别'}],
        enterpriseName: [{required: true, message: '请输入商家名称'}],
        enterpriseAddress: [{required: true, message: '请输入商家地址'}],
        fileName: [{required: true, message: '请上传参赛图片'}]
      },
      tableData:[],
      delId: ''
    }
  },
  methods: {
    changeFile(e) {
      this.form.fileName = e.target.files.length ? e.target.files[0].name : '';
    },
    handleDelDialogShow(id) {
      this.delId = id;
      this.dialog.del = true;
    },
    handleStatDialogShow() {
      this.dialogLoading = true;
      this.dialog.stat = true;
      this.$utils.getJson('/entries/statistics', res => {
        if (res.code === 200) {
          Object.assign(this.stat, res.data);
        }
        this.dialogLoading = false;
      }, () => this.dialogLoading = false, null, 'GET');
    },
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
    handleAdd() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;

        // 验证成功与后台交互
        this.dialogLoading = true;
        let formData = new window.FormData();
        formData.append('entriesName', this.form.entriesName);
        formData.append('entriesType', this.form.entriesType);
        formData.append('enterpriseName', this.form.enterpriseName);
        formData.append('enterpriseAddress', this.form.enterpriseAddress);
        formData.append('uploadFile', document.getElementById('file').files[0]);
        this.$utils.getJson('/entries/add', res => {
          if (res.code === 200) {
            this.dialog.add = false;
            this.getData();
            this.$utils.showMsg('添加成功');
          }
          this.dialogLoading = false;
        }, () => this.dialogLoading = false, formData, 'post', true);
      });
    },
    handleDel() {
      this.dialogLoading = true;
      this.$utils.getJson('/entries/delete?entriesId=' + this.delId, res => {
        if (res.code === 200) {
          this.dialog.del = false;
          this.getData();
          this.delId = '';
          this.$utils.showMsg('删除成功');
        }
        this.dialogLoading = false;
      }, () => this.dialogLoading = false, null, 'delete');
    },
    handleClose(formName) {
      if (formName) {
        this.$refs[formName].resetFields();
        this.$utils.resetObject(this.form);
        document.getElementById('file').value = '';
      }
    },
    getData() {
      this.tableLoading = true;
      this.$utils.getJson('/entries/query', res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableLoading = false;
      }, () => this.tableLoading = false, this.tableParams, 'GET');
    },
    setTableHeight() {
      this.tableHeight = this.$utils.getTableMaxHeight(['.pagination'], 46, '.el-main');
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
