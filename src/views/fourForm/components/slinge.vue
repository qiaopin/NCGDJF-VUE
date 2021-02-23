<template>
  <div class="left-form">
    <el-form :model="form" class="FPForm">
      <h3>基本信息</h3>
      <hr />
      <el-form-item label="房屋坐落" :label-width="formLabelWidth">
        <el-input
          v-model="form.cun"
          placeholder="请输入村（社区）"
          autocomplete="off"
        ></el-input>
        村（社区）
        <el-input
          v-model="form.group"
          required
          placeholder="请输入组"
          autocomplete="off"
        ></el-input>
        组
        <el-input
          v-model="form.doorNum"
          placeholder="请输入门牌号"
          autocomplete="off"
        ></el-input
        >（门牌号）
      </el-form-item>

      <el-form-item
        label="个人姓名"
        :rules="[
          { required: true, message: '个人姓名不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.hzxmDHZZL"
          placeholder="请输入个人姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="个人身份"
        :rules="[
          { required: true, message: '个人身份不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.sfDHZZL">
          <el-checkbox label="干部" name="sfDHZZL"></el-checkbox>
          <el-checkbox label="中共党员" name="sfDHZZL"></el-checkbox>
          <el-checkbox label="群众" name="sfDHZZL"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="证件号码"
        :rules="[
          { required: true, message: '证件号码不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.jsqkDHZZL"
          placeholder="请输入证件号码"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="是否本村村民"
        :rules="[
          { required: true, message: '是否本村村民不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.sfbccmDHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="本村村民" value="本村村民"></el-option>
          <el-option label="外村村民" value="外村村民"></el-option>
          <el-option label="城镇居民" value="城镇居民"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="土地主要来源"
        :rules="[
          { required: true, message: '土地主要来源不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.tdqdfsDHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="承包地" value="承包地"></el-option>
          <el-option label="自留地" value="自留地"></el-option>
          <el-option label="集体自营" value="集体自营"></el-option>
          <el-option label="租赁" value="租赁"></el-option>
          <el-option label="购买" value="购买"></el-option>
          <el-option label="流转" value="流转"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="建房原因"
        :rules="[
          { required: true, message: '建房原因不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.jfyyDHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="分户" value="分户"></el-option>
          <el-option label="移民搬迁" value="移民搬迁"></el-option>
          <el-option label="异地扶贫搬迁" value="异地扶贫搬迁"></el-option>
          <el-option label="地质灾害搬迁" value="地质灾害搬迁"></el-option>
          <el-option label="生态整治搬迁" value="生态整治搬迁"></el-option>
          <el-option label="拆迁安置" value="拆迁安置"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="开工时间"
        :rules="[
          { required: true, message: '开工时间不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-date-picker
          type="year"
          :picker-options="pickerOptions0"
          placeholder="请输入开工时间(年份)"
          v-model="form.kgsjDHZZL"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="房屋是否出售"
        prop="sfczcsDHZZL"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '房屋是否出售不能为空', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="form.sfczcsDHZZL">
          <el-radio label="否"></el-radio>
          <el-radio label="部分"></el-radio>
          <el-radio label="全部"></el-radio>
        </el-radio-group>
      </el-form-item>

      <h3>管理信息</h3>
      <hr />

      <el-form-item
        label="是否符合“一户一宅”或符合分户条件但未分户"
        prop="sfczcsDHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否符合“一户一宅”或符合分户条件但未分户不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group
          v-model="form.sffhyhyztjDHZZL"
          :style="{ lineHeight: '90px' }"
        >
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed3DHZZLTrN"
        label="一户多宅原因"
        :rules="[
          { required: true, message: '一户多宅原因不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.filed3DHZZL">
          <el-checkbox label="不符合分户条件" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="新建未拆旧" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="出售后再建" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="纯多占" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="继承" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="赠予" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="购买" name="filed3DHZZL"></el-checkbox>
          <el-checkbox label="其他" name="filed3DHZZL"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="宗地（项目）总占地面积"
        :rules="[
          {
            required: true,
            message: '宗地（项目）总占地面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.qztdmjDHZZL"
          placeholder="请输入宗地（项目）总占地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        label="占用耕地面积"
        :rules="[
          {
            required: true,
            message: '占用耕地面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.zygdmjDHZZL"
          placeholder="请输入占用耕地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        label="占用永久基本农田面积"
        :rules="[
          {
            required: true,
            message: '占用永久基本农田面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.filed2DHZZL"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cun: '',
        group: '',
        doorNum: '',
        hzxmDHZZL: '',
        sfDHZZL: [],
        jsqkDHZZL: '',
        tdqdfsDHZZL: '',
        jfyyDHZZL: '',
        kgsjDHZZL: '',
        sfczcsDHZZL: '',
        sffhyhyztjDHZZL: '',
        filed3DHZZL: [],
        qztdmjDHZZL: '',
        zygdmjDHZZL: '',
        filed2DHZZL: '',
      },
      filed3DHZZLTrN: false,
      formLabelWidth: '200px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.left-form {
  width: 40%;
  margin: 20px;

  .FPForm {
    margin: 10px;

    h3 {
      font-weight: bold;
      color: #1e9fff;
      font-size: 24px;
    }

    hr {
      color: #1e9fff;
      margin-bottom: 20px;
    }

    .el-form-item {
      color: #999;

      .el-input {
        margin-bottom: 10px;
        max-width: 300px;
        margin-right: 5px;
      }
      .el-select {
        width: 300px;
      }
    }
  }
}
</style>