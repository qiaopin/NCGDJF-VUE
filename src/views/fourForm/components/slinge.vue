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
        class="lhlabel"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否符合“一户一宅”或符合分户条件但未分户不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sfczcsDHZZL">
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

      <el-form-item label="本地区宅基地标准面积" :label-width="formLabelWidth">
        <el-input
          v-model="form.filed2DHZZL"
          placeholder="请输入本地区宅基地标准面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
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
          v-model="form.cgbdqgddzjdmjDHZZL"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        label="占用耕地的主要类型"
        :rules="[
          {
            required: true,
            message: '占用耕地的主要类型不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed4DHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="纯耕地" value="纯耕地"></el-option>
          <el-option
            label="休耕、 撂荒的耕地"
            value="休耕、 撂荒的耕地"
          ></el-option>
          <el-option
            label="应按照耕地管理的园地、 林地、 草地、 坑塘等用地"
            value="应按照耕地管理的园地、 林地、 草地、 坑塘等用地"
          ></el-option>
          <el-option
            label="应按照耕地管理的设施农业用地"
            value="应按照耕地管理的设施农业用地"
          ></el-option>
          <el-option
            label="应按照耕地管理的地面已硬化的乡村广场等用地"
            value="应按照耕地管理的地面已硬化的乡村广场等用地"
          ></el-option>
          <el-option
            label="自然资源管理部门认定为耕地， 但林草管理部门认定为林地或草地的土地"
            value="自然资源管理部门认定为耕地， 但林草管理部门认定为林地或草地的土地"
          ></el-option>
          <el-option label="其他耕地" value="其他耕地"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否符合城乡（村庄）规划"
        :rules="[
          {
            required: true,
            message: '是否符合城乡（村庄）规划不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.fhcxczghqkDHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="未编制规划" value="未编制规划"></el-option>
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否符合土地利用 总体规划（国土空间规划）情况"
        :rules="[
          {
            required: true,
            message: '是否符合土地利用 总体规划（国土空间规划）情况不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
        class="lhlabel"
      >
        <el-select v-model="form.fhtdlyztghqkDHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="用地手续情况"
        :rules="[
          {
            required: true,
            message: '用地手续情况不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed5DHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="无手续" value="无手续"></el-option>
          <el-option label="手续不全" value="手续不全"></el-option>
          <el-option label="有手续但不合规" value="有手续但不合规"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="没有合法合规用地手续主要原因"
        :rules="[
          {
            required: true,
            message: '没有合法合规用地手续主要原因不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
        class="lhlabel"
      >
        <el-select v-model="form.filed6DHZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option
            label="未申请办理用地手续"
            value="未申请办理用地手续"
          ></el-option>
          <el-option label="不符合申请条件" value="不符合申请条件"></el-option>
          <el-option label="无用地计划指标" value="无用地计划指标"></el-option>
          <el-option label="停批" value="停批"></el-option>
          <el-option label="不符合规划" value="不符合规划"></el-option>
          <el-option label="未缴费" value="未缴费"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否作出行政处罚"
        prop="sfbxzcfDHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否作出行政处罚不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sfbxzcfDHZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="是否申请法院强制执行"
        prop="filed7DHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否申请法院强制执行不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed7DHZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="法院是否受理"
        prop="filed8DHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '法院是否受理不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed8DHZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.xybcsmdqkDHZZL"
          class="resizeNone"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="照片"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '照片不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="imageJson"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="佐证材料"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '佐证材料不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fjJson"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item :style="{ textAlign: 'center ', padding: '20px' }">
        <el-button type="primary">保存</el-button>
        <el-button type="warning">修改</el-button>
        <el-button type="info">退出</el-button>
        <el-button>取消</el-button>
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
        cgbdqgddzjdmjDHZZL: '',
        filed4DHZZL: '',
        fhcxczghqkDHZZL: '',
        fhtdlyztghqkDHZZL: '',
        filed5DHZZL: '',
        filed6DHZZL: '',
        sfbxzcfDHZZL: '',
        filed7DHZZL: '',
        filed8DHZZL: '',
      },
      filed3DHZZLTrN: false,
      formLabelWidth: '200px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
      imageJson: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      fjJson: [],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
  },
}
</script>

<style lang="scss">
.lhlabel {
  .el-form-item__label {
    line-height: 23px;
  }
}

.resizeNone {
  .el-textarea__inner {
    //el_input中的隐藏属性
    resize: none; //主要是这个样式
    height: 120px;
  }
}
</style>

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