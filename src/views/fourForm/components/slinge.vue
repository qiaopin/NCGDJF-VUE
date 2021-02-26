<template>
  <div class="left-form">
    <el-form :model="form" ref="form" :rules="formRules" class="FPForm">
      <h3>基本信息</h3>
      <hr />
      <el-form-item
        label="房屋坐落"
        prop="locaiton"
        :label-width="formLabelWidth"
      >
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
        prop="hzxmDHZZL"
        :rules="[
          { required: true, message: '个人姓名不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="hzxmDHZZL"
          v-model="form.hzxmDHZZL"
          placeholder="请输入个人姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="个人身份"
        prop="sfDHZZL"
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
        prop="jsqkDHZZL"
        label="证件号码"
        :rules="[
          { required: true, message: '证件号码不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.jsqkDHZZL"
          placeholder="请输入证件号码或‘无’"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="sfbccmDHZZL"
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
        prop="tdqdfsDHZZL"
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
        prop="jfyyDHZZL"
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
        prop="kgsjDHZZL"
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
        v-show="sffhyhyztjDHZZLTrN"
        label="是否符合“一户一宅”或符合分户条件但未分户"
        prop="sffhyhyztjDHZZL"
        class="lhlabel"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: sffhyhyztjDHZZLNrF,
            message: '是否符合“一户一宅”或符合分户条件但未分户不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sffhyhyztjDHZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="filed3DHZZL"
        v-show="filed3DHZZLTrN"
        label="一户多宅原因"
        :rules="[
          {
            required: filed3DHZZLTrF,
            message: '一户多宅原因不能为空',
            trigger: 'blur',
          },
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
        prop="qztdmjDHZZL"
        label="宗地（项目）总占地面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.qztdmjDHZZL"
          placeholder="请输入宗地（项目）总占地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="zygdmjDHZZL"
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
          type="number"
          v-model.number="form.zygdmjDHZZL"
          placeholder="请输入占用耕地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="filed2DHZZL"
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
          type="number"
          v-model.number="form.filed2DHZZL"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="bzarea"
        label="本地区宅基地标准面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.bzarea"
          placeholder="本地区宅基地标准面积是为计算超出本地区宅基地标准面积，可为空"
          autocomplete="off"
        ></el-input
        >（/平方米）
      </el-form-item>

      <el-form-item
        prop="cgbdqgddzjdmjDHZZL"
        label="超出本地区宅基地标准面积"
        :rules="[
          {
            required: true,
            message: '超出本地区宅基地标准面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.cgbdqgddzjdmjDHZZL"
          placeholder="请输入超出本地区宅基地标准面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-tooltip
          effect="dark"
          content="请填写本地区宅基地标准面积"
          placement="top-start"
        >
          <el-button
            type="primary"
            :disabled="cgbdqgddzjdmjDHZZLdis"
            size="small"
            @click="cgbdqgddzjdmjDHZZLAnalysis"
            >分析</el-button
          >
        </el-tooltip>
      </el-form-item>

      <el-form-item
        prop="filed4DHZZL"
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
        prop="fhcxczghqkDHZZL"
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
        prop="fhtdlyztghqkDHZZL"
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
        prop="filed5DHZZL"
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
        prop="filed6DHZZL"
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
        v-show="filed7DHZZLTrN"
        label="是否申请法院强制执行"
        prop="filed7DHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed7DHZZLTrF,
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
        v-show="filed8DHZZLTrN"
        label="法院是否受理"
        prop="filed8DHZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed8DHZZLTrF,
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
          :http-request="photoBox"
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
          :http-request="photoBoxCL"
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
        <el-button type="success" @click="onSubmit">保存</el-button>
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
    const reg = /^\d+.?\d{0,2}$/
    const qztdmjDHZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value < this.form.zygdmjDHZZL) {
          callback(new Error('占用耕地面积不能大于宗地（项目）总占地面积'))
        } else if (value < this.filed2DHZZL) {
          callback(
            new Error('占用永久基本农田面积不能大于宗地（项目）总占地面积')
          )
        } else if (value < this.form.cgbdqgddzjdmjDHZZL) {
          callback(
            new Error('超出本地区宅基地标准面积不能大于宗地（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('宗地（项目）总占地面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const zygdmjDHZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.qztdmjDHZZL) {
          callback(new Error('占用耕地面积不能大于宗地（项目）总占地面积'))
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用耕地面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const filed2DHZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.qztdmjDHZZL) {
          callback(
            new Error('占用永久基本农田面积不能大于宗地（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用永久基本农田面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const cgbdqgddzjdmjDHZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.qztdmjDHZZL) {
          callback(
            new Error('超出本地区宅基地标准面积不能大于宗地（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('超出本地区宅基地标准面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }

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
        bzarea: '',
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
      formRules: {
        qztdmjDHZZL: [
          {
            required: true,
            message: '宗地（项目）总占地面积不能为空',
            trigger: 'blur',
          },
          //  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // {
          //   required: true,
          //   pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          //   message: '姓名不支持特殊字符',
          //   trigger: 'blur',
          // },
          { required: true, trigger: 'blur', validator: qztdmjDHZZLvalidate },
        ],
        zygdmjDHZZL: [
          { required: true, message: '占用耕地面积不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: zygdmjDHZZLvalidate },
        ],
        filed2DHZZL: [
          {
            required: true,
            message: '占用永久基本农田面积不能为空',
            trigger: 'blur',
          },
          { required: true, trigger: 'blur', validator: filed2DHZZLvalidate },
        ],
        cgbdqgddzjdmjDHZZL: [
          {
            required: true,
            message: '超出本地区宅基地标准面积不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            trigger: 'blur',
            validator: cgbdqgddzjdmjDHZZLvalidate,
          },
        ],
      },
      sffhyhyztjDHZZLNrF: false,
      sffhyhyztjDHZZLTrN: false,
      filed3DHZZLTrF: false,
      filed3DHZZLTrN: false,
      filed7DHZZLTrF: false,
      filed7DHZZLTrN: false,
      filed8DHZZLTrN: false,
      filed8DHZZLTrF: false,
      cgbdqgddzjdmjDHZZLdis: true,
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
  watch: {
    // 'form.qztdmjDHZZL': function (value, oldval) {
    //   if (value >= 0) {
    //     if (this.form.zygdmjDHZZL > value) {
    //       this.$message.error('占用耕地面积不得大于宗地（项目）总占地面积')
    //     } else if (this.form.filed2DHZZL > value) {
    //       this.$message.error(
    //         '占用永久基本农田面积不得大于宗地（项目）总占地面积'
    //       )
    //     } else if (this.form.cgbdqgddzjdmjDHZZL > value) {
    //       this.$message.error(
    //         '超出本地区宅基地标准面积不得大于或等于 宗地（项目）总占地面积'
    //       )
    //     } else {
    //     }
    //   } else {
    //     this.$message.error('宗地（项目）总占地面积不能小于0')
    //   }
    // },
    // 'form.zygdmjDHZZL': function (value, oldval) {
    //   if (this.form.qztdmjDHZZL) {
    //     if (value > this.form.qztdmjDHZZL) {
    //       this.$message.error('占用耕地面积不得大于房屋（项目）总占地面积')
    //     } else {
    //     }
    //   } else {
    //   }
    // },
    // 'form.filed2DHZZL': function (value, oldval) {
    //   if (this.form.qztdmjDHZZL) {
    //     if (value > this.form.qztdmjDHZZL) {
    //       this.$message.error(
    //         '占用永久基本农田面积不得大于房屋（项目）总占地面积'
    //       )
    //     } else {
    //     }
    //   }
    // },
    // 'form.cgbdqgddzjdmjDHZZL': function (value, oldval) {
    //   if (this.form.qztdmjDHZZL) {
    //     if (value >= this.form.qztdmjDHZZL) {
    //       this.$message.error(
    //         '超出本地区宅基地标准面积不得大于或等于 房屋（项目）总占地面积'
    //       )
    //     } else {
    //     }
    //   }
    // },
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val.sfbccmDHZZL === '本村村民') {
          this.sffhyhyztjDHZZLTrN = true
          this.sffhyhyztjDHZZLNrF = true
          if (val.sffhyhyztjDHZZL === '否') {
            this.filed3DHZZLTrN = true
            this.filed3DHZZLTrF = true
          } else {
            this.filed3DHZZLTrN = false
            this.filed3DHZZLTrF = false
          }
        } else {
          this.sffhyhyztjDHZZLTrN = false
          this.sffhyhyztjDHZZLNrF = false
        }

        if (val.sfbxzcfDHZZL === '是') {
          this.filed7DHZZLTrN = true
          this.filed7DHZZLTrF = true
          if (val.filed7DHZZL === '是') {
            this.filed8DHZZLTrN = true
            this.filed8DHZZLTrF = true
          } else {
            this.filed8DHZZLTrN = false
            this.filed8DHZZLTrF = false
          }
        } else {
          this.filed7DHZZLTrN = false
          this.filed7DHZZLTrF = false
        }

        if (val.bzarea) {
          this.cgbdqgddzjdmjDHZZLdis = false
        } else {
          this.cgbdqgddzjdmjDHZZLdis = true
        }

        // if (val.qztdmjDHZZL) {
        //   if (val.qztdmjDHZZL) {
        //     if (val.zygdmjDHZZL > val.qztdmjDHZZL) {
        //       this.$message.error('占用耕地面积不得大于宗地（项目）总占地面积')
        //     } else {
        //     }
        //   } else {
        //   }

        //   if (val.qztdmjDHZZL) {
        //     if (val.filed2DHZZL > val.qztdmjDHZZL) {
        //       this.$message.error(
        //         '占用永久基本农田面积不得大于宗地（项目）总占地面积'
        //       )
        //     } else {
        //     }
        //   } else {
        //   }

        //   if (val.qztdmjDHZZ) {
        //     if (val.cgbdqgddzjdmjDHZZL >= val.qztdmjDHZZL) {
        //       this.$message.error(
        //         '超出本地区宅基地标准面积不得大于或等于 宗地（项目）总占地面积'
        //       )
        //     } else {
        //     }
        //   } else {
        //   }
        // }
      },
      deep: true, //true 深度监听
    },
  },
  filters: {},
  methods: {
    //  @keyup.native="form.qztdmjDHZZL = checkInputs(form.qztdmjDHZZL)"
    checkInputs(num) {
      let str = num.toString()
      let len1 = str.split('.')[1]
      if (str.indexOf('.') != -1) {
        if (len1 > 2) {
          return Number(str).toFixed(2)
        } else {
          return str
        }
      } else {
        return str
      }
    },
    cgbdqgddzjdmjDHZZLAnalysis() {
      this.form.cgbdqgddzjdmjDHZZL = this.form.qztdmjDHZZL - this.form.bzarea
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    photoBox(params) {
      const file = params.file
      const forml = new FormData()
      // 文件对象
      forml.append('file', file)
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      // form.append('clientType', 'xxx')
      // 项目封装的请求方法，下面做简单介绍
    },
    photoBoxCL(params) {},
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning',
          })
          return false
        }
      })
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