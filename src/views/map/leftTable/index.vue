<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="坐落">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="权属人名称">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="完成度">
              <span>{{ props.row.desc }}%</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="坐落" prop="name"> </el-table-column>
      <el-table-column sortable label="完成度%" prop="desc"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<style>
.el-table .warning-row {
  background: rgb(253, 230, 230);
  /* background: rgb(200, 0, 0); */
}

.el-table .success-row {
  background: #f0f9eb;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-pagination {
  position: absolute;
  text-align: center;
  bottom: 7px;
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '三旗杆村',
          category: '单户住宅',
          desc: 0,
          address: '真北路',
          shop: '王小虎',
          shopId: '10333',
        },
        {
          id: '12987123',
          name: '三旗杆村',
          category: '单户住宅',
          desc: 50,
          address: '真北路',
          shop: '王小虎',
          shopId: '10333',
        },
        {
          id: '12987125',
          name: '三旗杆村',
          category: '单户住宅',
          desc: 85,
          address: '真北路',
          shop: '王小虎',
          shopId: '10333',
        },
        {
          id: '12987126',
          name: '三旗杆村',
          category: '单户住宅',
          desc: 100,
          address: '真北路',
          shop: '王小虎',
          shopId: '10333',
        },
      ],
      loading: false,
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      var wcd = parseInt(row.desc)
      if (wcd >= 80) {
        return 'success-row'
      } else {
        return 'warning-row'
      }
      //   if (rowIndex === 1) {
      //     return 'warning-row'
      //   } else if (rowIndex === 3) {
      //     return 'success-row'
      //   }
      //   return ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>